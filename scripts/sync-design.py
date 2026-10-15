"""
Copy the approved templates from marketing-design into design/, and make the
gallery previews.

    python scripts/sync-design.py [path-to-marketing-design]

The default source is ../marketing-design next to this repo.

What it does:
  - Finds every template: a folder under products/<product>/ that holds a
    page.njk (or front.njk for two-sided pieces). inspiration/ and anything
    under proposals/ are skipped; they are not approved.
  - Copies each one to design/products/<product>/<id>/ unchanged, so the
    relative paths inside (style.css, assets/, ../../../brand/fonts/) keep
    working.
  - Copies only the font files those style.css files reference.
  - Writes previews/<id>.webp (800 px wide) for the gallery cards. It renders
    the template's page.html in headless Edge (or Chrome), so a change made
    in the template since sample.png was exported (the legal line, say) shows
    in the gallery. Without a browser it falls back to sample.png.
  - Lists templates that are in marketing-design but not in data/manifest.js,
    and the other way round. Adding them to the manifest is a person's job:
    the manifest says things the folder cannot (name, description, ground,
    requirements).
"""

import functools
import http.server
import re
import shutil
import subprocess
import sys
import tempfile
import threading
from pathlib import Path
from urllib.parse import quote, unquote

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / "marketing-design"
DEST = ROOT / "design"
PREVIEWS = ROOT / "previews"
PREVIEW_WIDTH = 800

DEMO = ROOT / "assets" / "demo"

# page.html is rendered output; the site renders page.njk itself.
# assets/sample/ is the demo listing, the same photos in every template. One
# web-sized copy goes to assets/demo/ instead of five full-size ones.
SKIP_FILES = {"page.html", "sample"}


def find_templates():
    for product in sorted((SRC / "products").iterdir()):
        if not product.is_dir():
            continue
        for folder in sorted(product.iterdir()):
            if folder.name in ("inspiration", "proposals") or not folder.is_dir():
                continue
            if (folder / "page.njk").exists() or (folder / "front.njk").exists():
                yield product.name, folder


def copy_template(product, folder):
    out = DEST / "products" / product / folder.name
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(folder, out, ignore=lambda d, names: [n for n in names if n in SKIP_FILES])
    return out


def referenced_fonts(css_path):
    css = css_path.read_text(encoding="utf-8")
    for url in re.findall(r'url\("?([^")]+)"?\)', css):
        if "brand/fonts/" in url:
            yield (css_path.parent / unquote(url)).resolve()


def save_preview(im, template_id):
    PREVIEWS.mkdir(exist_ok=True)
    im = im.convert("RGB")
    h = round(im.height * PREVIEW_WIDTH / im.width)
    im.resize((PREVIEW_WIDTH, h), Image.LANCZOS).save(
        PREVIEWS / f"{template_id}.webp", "WEBP", quality=86, method=6
    )


def make_preview(sample, template_id):
    with Image.open(sample) as im:
        save_preview(im, template_id)


BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
]

# Print templates are laid out in pt: an 8.5 x 11 in sheet with 0.125 in bleed
# is 840 x 1080 CSS px, and the trim is that less 12 px a side.
SHEET = (840, 1080)
BLEED = 12
SCALE = 2


def find_browser():
    return next((b for b in BROWSERS if Path(b).exists()), None)


def serve(directory):
    """Serve marketing-design over http so the fonts load (file:// blocks them)."""
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    handler = functools.partial(Quiet, directory=str(directory))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def render_preview(browser, server, folder, template_id):
    """Screenshot page.html at 2x and crop to the trim, like sample.png."""
    rel = folder.relative_to(SRC).as_posix()
    url = f"http://127.0.0.1:{server.server_address[1]}/{quote(rel)}/page.html"
    with tempfile.TemporaryDirectory() as tmp:
        shot = Path(tmp) / "shot.png"
        subprocess.run([
            browser, "--headless=new", "--hide-scrollbars", "--disable-gpu",
            f"--window-size={SHEET[0]},{SHEET[1]}",
            f"--force-device-scale-factor={SCALE}",
            "--virtual-time-budget=8000",
            f"--screenshot={shot}", url,
        ], check=True, capture_output=True, timeout=120)
        with Image.open(shot) as im:
            b = BLEED * SCALE
            save_preview(im.crop((b, b, SHEET[0] * SCALE - b, SHEET[1] * SCALE - b)), template_id)


def make_demo_photos(folder):
    """The demo listing and agent, web-sized, for the form's sample fill."""
    DEMO.mkdir(parents=True, exist_ok=True)
    for src in (folder / "assets" / "sample").iterdir():
        if src.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
            continue
        target = DEMO / (src.stem + ".webp")
        if target.exists():
            continue
        with Image.open(src) as im:
            keep_alpha = "headshot" in src.stem
            im = im.convert("RGBA" if keep_alpha else "RGB")
            width = 900 if keep_alpha else (2000 if src.stem == "hero" else 1200)
            if im.width > width:
                im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            im.save(target, "WEBP", quality=84, method=6)


def main():
    if not (SRC / "products").exists():
        sys.exit(f"Not a marketing-design folder: {SRC}")

    found = []
    fonts = set()
    browser = find_browser()
    server = serve(SRC) if browser else None
    if not browser:
        print("  No Edge or Chrome found: previews come from sample.png")
    for product, folder in find_templates():
        out = copy_template(product, folder)
        found.append(folder.name)
        for css in out.glob("*.css"):
            for font in referenced_fonts(folder / css.name):
                fonts.add(font)
        # Only the flyer size is wired up for rendering so far; two-sided
        # and other sizes use their exported samples.
        if browser and product == "flyer" and (folder / "page.html").exists():
            render_preview(browser, server, folder, folder.name)
        else:
            for side in ("sample.png", "front.png", "back.png"):
                if (folder / side).exists():
                    suffix = "" if side == "sample.png" else "-" + side[:-4]
                    make_preview(folder / side, folder.name + suffix)
        if (folder / "assets" / "sample").is_dir():
            make_demo_photos(folder)
        print(f"  {product}/{folder.name}")

    src_brand = (SRC / "brand").resolve()
    for font in sorted(fonts):
        rel = font.relative_to(src_brand)
        target = DEST / "brand" / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(font, target)
    print(f"  {len(fonts)} font files")

    manifest = (ROOT / "data" / "manifest.js").read_text(encoding="utf-8")
    listed = set(re.findall(r'^\s*id:\s*"([a-z0-9-]+)",\s*product:', manifest, re.M))
    new = sorted(set(found) - listed)
    gone = sorted(listed - set(found))
    if new:
        print("\nIn marketing-design but not in data/manifest.js:")
        for t in new:
            print(f"  + {t}")
    if gone:
        print("\nIn data/manifest.js but no longer in marketing-design:")
        for t in gone:
            print(f"  - {t}")
    if not new and not gone:
        print("\nManifest matches marketing-design.")


if __name__ == "__main__":
    main()
