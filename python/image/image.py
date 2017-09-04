import PIL.Image as pilimg
import numpy as np
 
# Read image
IMAGE_PATH = './sample.png'
im = pilimg.open(IMAGE_PATH)
 
# Display image
im.show()

im.save('savedImg.png')
 
# Fetch image pixel data to numpy array
pix = np.array(im)
print(pix)
