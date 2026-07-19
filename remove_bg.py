import os
import glob
from PIL import Image

def remove_background(image_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # Define a threshold for white/light-grey
        # Most of these AI images have backgrounds that are r,g,b > 230
        r, g, b, a = item
        if r > 240 and g > 240 and b > 240:
            new_data.append((255, 255, 255, 0))
        elif r > 210 and g > 210 and b > 210:
            # Feather the edge
            diff = max(255 - r, 255 - g, 255 - b)
            alpha = int((diff / 45.0) * 255)
            new_data.append((r, g, b, alpha))
        else:
            new_data.append(item)

    img.putdata(new_data)
    
    # Save as PNG
    new_path = image_path.replace(".jpg", ".png")
    img.save(new_path, "PNG")
    print(f"Saved {new_path}")

def main():
    images = glob.glob("src/assets/illustrations/*.jpg")
    for img_path in images:
        remove_background(img_path)

if __name__ == "__main__":
    main()
