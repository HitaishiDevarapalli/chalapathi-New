from PIL import Image

img = Image.open("/Users/dineshpabbathi/.gemini/antigravity/brain/1226b0a5-cf09-4a39-8f6e-734562bf131a/.user_uploaded/media__1784447800847.png")
w, h = img.size
print(f"Image size: {w}x{h}")

# Row 1 has 3 cards, Row 2 has 1 card
# Each card is roughly w/3 wide
card_w = w // 3

# Card 1 (top-left): B.Tech CSE - Monitor with code (already done)
# Card 2 (top-center): M.Tech CSE - Chip on book
mtech_cse = img.crop((card_w + 50, 10, card_w * 2 - 30, int(h * 0.42)))

# Card 3 (top-right): MCA - Globe with cloud/devices
mca = img.crop((card_w * 2 + 30, 10, w - 20, int(h * 0.42)))

# Card 4 (bottom-left): Ph.D CSE - Graduation cap with books
phd_cse = img.crop((30, int(h * 0.48), card_w - 20, int(h * 0.90)))

# Make backgrounds transparent and save
for name, cropped in [("mtech_cse", mtech_cse), ("mca", mca), ("phd_cse", phd_cse)]:
    cropped = cropped.convert("RGBA")
    data = cropped.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if r > 225 and g > 225 and b > 225:
            new_data.append((255, 255, 255, 0))
        elif r > 210 and g > 210 and b > 210:
            diff = max(255 - r, 255 - g, 255 - b)
            alpha = int((diff / 45.0) * 255)
            new_data.append((r, g, b, alpha))
        else:
            new_data.append(item)
    cropped.putdata(new_data)
    out_path = f"src/assets/illustrations/{name}.png"
    cropped.save(out_path, "PNG")
    print(f"Saved {out_path} ({cropped.size[0]}x{cropped.size[1]})")

print("Done!")
