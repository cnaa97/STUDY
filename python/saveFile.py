# import urllib

# urllib.urlretrieve ("https://lh6.googleusercontent.com/-Xtk-Y5jwSLs/AAAAAAAAAAI/AAAAAAAAAII/5n8mNmSWwGk/photo.jpg", "test.jpg")

import urllib2

dwn_link = 'http://222.239.101.153/media/real/2013/02/28/18004525/53556805/CW1200180045252005005355680514.enc.mp4?st=bYLcFdxI8tRFENId2kMRig&e=1507832953&mp4'
file_name = 'test_video.mp4'
rsp = urllib2.urlopen(dwn_link)
with open(file_name,'wb') as f:
    f.write(rsp.read())


# https://stackoverflow.com/questions/30953104/download-video-from-url-in-python