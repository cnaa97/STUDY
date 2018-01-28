"""
import re
import urllib
fileNo = 0
racingGirlUrl = 'http://gall.dcinside.com/list.php?id=racinggirl&no='
for no in range(170710, 170720):
        url = racingGirlUrl + str(no)
        f = urllib.urlopen(url)
        html = f.read()
        imageUrlList = re.findall("http://image.dcinside.com/download.php[^']+", html)
        print imageUrlList
        for url in imageUrlList:
                print fileNo
                contents = urllib.urlopen(url).read()
                file(str(fileNo)+'.jpg', 'wb').write(contents)
                fileNo = fileNo + 1

"""


import re
import urllib


"""
# Find png image and save in the order number

fileNo = 0
iconUrl = 'http://flat-icon-design.com/'

for no in range(720, 722):
	url = iconUrl + "?p=" + str(no)
	f = urllib.urlopen(url)
	html = str(f.read())
#	imgUrlList = re.findall("f[a-zA-Z_/]*.zip", html)
	imgUrlList = re.findall(r"f/.*?\.png", html)
	print imgUrlList

	for url2 in imgUrlList:
		print (fileNo)
		contents = urllib.urlopen(iconUrl+url2).read()
#		zip = open(str(fileNo)+'.png', wb)
#		zip.write(contents)
#		zip.close()
		file(str(fileNo)+'.png', 'wb').write(contents)
		fileNo = fileNo + 1
"""


# Find images from listing page

fileNo = 40
iconUrl = 'http://flat-icon-design.com/'

for no in range(3, 25):
	url = iconUrl + "?paged=" + str(no)
	
	f = urllib.urlopen(url)
	html = str(f.read())
	imgUrlList = re.findall(r"f/.*?\.png", html)
	print imgUrlList

	for url2 in imgUrlList:
		print (fileNo)
		contents = urllib.urlopen(iconUrl+url2).read()
		file(str(fileNo)+'.png', 'wb').write(contents)
		fileNo = fileNo + 1

"""
# Becauce of Javascript, Can't find zip file. zip file is hidden.

fileNo = 0
iconUrl = 'http://flat-icon-design.com/'

for no in range(720, 722):
	url = iconUrl + "?p=" + str(no)
	f = urllib.urlopen(url)
	html = str(f.read())
	imgUrlList = re.findall("f[a-zA-Z_/]*.zip", html)
	print imgUrlList

	for url2 in imgUrlList:
		print (fileNo)
		contents = urllib.urlopen(iconUrl+url2).read()
#		zip = open(str(fileNo)+'.zip', wb)
#		zip.write(contents)
#		zip.close()
		file(str(fileNo)+'.zip', 'wb').write(contents)
		fileNo = fileNo + 1

"""
