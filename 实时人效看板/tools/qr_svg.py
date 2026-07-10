#!/usr/bin/env python3
import io
import sys

import qrcode
import qrcode.image.svg


def main():
    value = sys.argv[1] if len(sys.argv) > 1 else ""
    if not value:
        raise SystemExit(1)

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(value)
    qr.make(fit=True)

    image = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    out = io.BytesIO()
    image.save(out)
    sys.stdout.buffer.write(out.getvalue())


if __name__ == "__main__":
    main()
