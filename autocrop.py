from PIL import Image
import os

images = [
    "src/assets/illustrations/computer_science.png",
    "src/assets/illustrations/mtech_cse.png",
    "src/assets/illustrations/mca.png",
    "src/assets/illustrations/phd_cse.png"
]

for img_path in images:
    if os.path.exists(img_path):
        img = Image.open(img_path)
        img = img.convert("RGBA")
        bbox = img.getbbox()
        if bbox:
            cropped = img.crop(bbox)
            cropped.save(img_path)
            print(f"Cropped {img_path} to {bbox}")
        else:
            print(f"No bounding box for {img_path}")
    else:
        print(f"{img_path} not found")
