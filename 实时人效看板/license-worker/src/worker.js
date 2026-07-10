const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type,x-admin-key",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS_HEADERS,
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function passwordHash(env, password) {
  return sha256Hex(`${env.PASSWORD_PEPPER || ""}\n${password}`);
}

function requireAdmin(request, env) {
  const key = request.headers.get("x-admin-key") || "";
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
    throw new Response(JSON.stringify({ ok: false, error: "管理密钥错误" }), {
      status: 401,
      headers: {
        ...CORS_HEADERS,
        "content-type": "application/json; charset=utf-8",
      },
    });
  }
}

function validateAppId(body, env) {
  if (env.APP_ID && body.appId !== env.APP_ID) {
    throw new Error("应用不匹配");
  }
}

async function login(request, env) {
  const body = await readJson(request);
  validateAppId(body, env);
  const username = normalizeUsername(body.username);
  const password = String(body.password || "");
  const deviceId = String(body.deviceId || "").trim();
  const deviceLabel = String(body.deviceLabel || "").trim().slice(0, 120);

  if (!username || !password || !deviceId) {
    return json({ ok: false, error: "缺少账号、密码或设备码" }, 400);
  }

  const row = await env.DB.prepare("SELECT * FROM users WHERE username = ?1").bind(username).first();
  if (!row) return json({ ok: false, error: "账号或密码错误" }, 401);
  if (row.status !== "active") return json({ ok: false, error: "账号已锁定，请联系管理员" }, 403);

  const inputHash = await passwordHash(env, password);
  if (inputHash !== row.password_hash) {
    return json({ ok: false, error: "账号或密码错误" }, 401);
  }

  const time = nowIso();
  if (!row.bound_device_hash) {
    await env.DB.prepare(`
      UPDATE users
      SET bound_device_hash = ?1,
          bound_device_label = ?2,
          first_login_at = ?3,
          last_login_at = ?3,
          updated_at = ?3
      WHERE username = ?4
    `).bind(deviceId, deviceLabel, time, username).run();
    return json({ ok: true, username, role: row.role || "user", bound: true });
  }

  if (row.bound_device_hash !== deviceId) {
    if (env.LOCK_ON_DEVICE_MISMATCH !== "0") {
      await env.DB.prepare(`
        UPDATE users
        SET status = 'locked',
            locked_at = ?1,
            updated_at = ?1
        WHERE username = ?2
      `).bind(time, username).run();
      return json({ ok: false, error: "账号已绑定其他设备，本次登录已锁定账号" }, 403);
    }
    return json({ ok: false, error: "账号已绑定其他设备" }, 403);
  }

  await env.DB.prepare("UPDATE users SET last_login_at = ?1, updated_at = ?1 WHERE username = ?2")
    .bind(time, username)
    .run();
  return json({ ok: true, username, role: row.role || "user", bound: true });
}

async function upsertUser(request, env) {
  requireAdmin(request, env);
  const body = await readJson(request);
  const username = normalizeUsername(body.username);
  const password = String(body.password || "");
  const role = body.role === "admin" ? "admin" : "user";
  const status = body.status === "locked" ? "locked" : "active";
  if (!username || !password) return json({ ok: false, error: "缺少账号或密码" }, 400);

  const hash = await passwordHash(env, password);
  const time = nowIso();
  await env.DB.prepare(`
    INSERT INTO users (username, password_hash, role, status, created_at, updated_at)
    VALUES (?1, ?2, ?3, ?4, ?5, ?5)
    ON CONFLICT(username) DO UPDATE SET
      password_hash = excluded.password_hash,
      role = excluded.role,
      status = excluded.status,
      updated_at = excluded.updated_at
  `).bind(username, hash, role, status, time).run();

  return json({ ok: true, username, role, status });
}

async function resetDevice(request, env) {
  requireAdmin(request, env);
  const body = await readJson(request);
  const username = normalizeUsername(body.username);
  if (!username) return json({ ok: false, error: "缺少账号" }, 400);
  const time = nowIso();
  await env.DB.prepare(`
    UPDATE users
    SET bound_device_hash = NULL,
        bound_device_label = NULL,
        first_login_at = NULL,
        status = 'active',
        locked_at = NULL,
        updated_at = ?1
    WHERE username = ?2
  `).bind(time, username).run();
  return json({ ok: true, username });
}

async function listUsers(request, env) {
  requireAdmin(request, env);
  const rows = await env.DB.prepare(`
    SELECT username, role, status, bound_device_label, first_login_at, last_login_at, locked_at, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
    LIMIT 200
  `).all();
  return json({ ok: true, users: rows.results || [] });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });
    const url = new URL(request.url);
    try {
      if (request.method === "POST" && url.pathname === "/login") return login(request, env);
      if (request.method === "POST" && url.pathname === "/admin/users") return upsertUser(request, env);
      if (request.method === "POST" && url.pathname === "/admin/users/reset-device") return resetDevice(request, env);
      if (request.method === "GET" && url.pathname === "/admin/users") return listUsers(request, env);
      return json({ ok: false, error: "Not found" }, 404);
    } catch (error) {
      if (error instanceof Response) return error;
      return json({ ok: false, error: error.message || "服务器错误" }, 500);
    }
  },
};
