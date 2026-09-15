from PIL import Image
import sys

def remove_white_bg(image_path, output_path, tolerance=240):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_white_bg("assets/logo.png", "assets/logo.png")
