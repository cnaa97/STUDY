
Framer.Device.customize
	deviceType: Framer.Device.Type.Phone
	devicePixelRatio: 2
	screenWidth: 1440/2	
	screenHeight: 2684/2
	deviceImage: "images/phone.png"
	deviceImageWidth: 1441/2
	deviceImageHeight: 3105/2
# Import file "home"
psd = Framer.Importer.load("imported/home@1x", scale: 0.25)

sound = new Audio("sounds/Button7.m4a")
effect = new Audio("sounds/Success1.m4a")
#variables
cx = psd.big_circle.x
cy = psd.big_circle.y
small = psd.small_circle.children
big = psd.big_circle.children

#basic setting for psd
backgroundLayer = new BackgroundLayer
	opacity: 0
psd.fingerprint.opacity = 0
psd.homesc.x = Align.center
psd.top_indi.opacity = 0
isFadeIn = false
fp = new Layer
	width: 44
	height: 49
	opacity: 0.5
	x: 50
	y: psd.fingerprint.y
	parent: psd.indicator
	image: "images/fingerprint.png"
for children in psd.big_circle.children
	children.opacity = 0
	children.scale = 0

for layer in psd.small_circle.children
	layer.scale = 0
	layer.opacity = 0
	
	fadeIn = new Animation layer,
		opacity: 1
		scale: 1
		options: 
			curve: Spring(damping: 0.5)
			time: Utils.randomNumber(1,3)
			delay: 3
			
	fadeIn.on Events.AnimationStart, ->
		playSound()
		isFadeIn = true
	fadeIn.start()
	
playSound = ->
	if isFadeIn
		effect.play()
		effect.volume = 0.5
	isFadeIn = false
				
psd.time.opacity = 0
psd.time.animate
	opacity: 1
	options: 
		time: 2
		delay: 1
				
psd.big0.animate
	opacity: 1
	scale: 1
	options: 
		curve: Spring(damping: 0.5)
		time: 2
		delay: 3

#Contents Array
arrayA = []
#b contents Array
arrayB = []
for num in [0..8]
	strA = "psd.content"+num
	arrayA.push(eval(strA))
	strB = "psd.b_content"+num
	arrayB.push(eval(strB))

	
for layer in psd.big_circle.children
	layer.opacity = 0
	layer.states = 
		fadeOut:
			opacity:0
			scale:0
			animationOptions:
				time: 0.5
				curves: Bezier.ease
		fadeIn:
			opacity:1
			scale:1
			animationOptions:
				time: 0.5
				curves: Bezier.ease
# 	fadeIn.on Events.AnimationEnd
	
#small contents add states
for content in psd.small_circle.children
	content.states =
		goIn:
			x: Align.center
			y: Align.center
			opacity: 0
			animationOptions:
				time: 0.5
				curves: Bezier.ease
		show:
			opacity: 1
			scale: 1
			animationOptions:
				time: 0.5
				curves: Bezier.ease
			


#둥둥effect
for layerA in arrayA
	animationA = new Animation layerA,
		x: layerA.x - Utils.randomNumber(-5,5)
		y: layerA.y - Utils.randomNumber(-5,5)
		options: 
			curves: Bezier.easeOut
			time : 1

	animationB = animationA.reverse()
	animationA.on Events.AnimationEnd, animationB.start
	animationB.on Events.AnimationEnd, animationA.start
	animationA.start()
	
for layer in arrayB
	animationA = new Animation layer,
		x: layer.x - Utils.randomNumber(-5,5)
		y: layer.y - Utils.randomNumber(-5,5)
		options: 
			curves: Bezier.easeOut
			time : 1

	animationB = animationA.reverse()
	animationA.on Events.AnimationEnd, animationB.start
	animationB.on Events.AnimationEnd, animationA.start
	animationA.start()


i = 9
psd.content0.opacity = 0
isOn = false
touchLayer = new Layer
	width: 360
	height: 400
	x: Align.center
	y: 180
	backgroundColor: "transparent"
	

psd.home2.onTouchStart (event,layer) ->
	event.preventDefault()
	sound.play()
	psd.content0.opacity = 1
	i--
	if i > 0
		small[i].animate
			opacity: 1
			scale: 1
			x: small[i-1].x
			y: small[i-1].y
			options:
				time: 0.5
				curves: Bezier.ease
		small[i-1].animate("goIn")
		big[i].animate("fadeOut")
		big[i-1].animate("fadeIn")
		
		if i < 8 
			small[i].animate
				opacity: 1
				scale: 1
				x: small[i-1].x
				y: small[i-1].y
				options: 
					time: 1
					curves: Bezier.ease
	if i == 0
		small[i].animate
			opacity: 1
			scale: 1
			x: small[8].x
			y: small[8].y
			options:
				time: 0.5
				curves: Bezier.ease
		small[8].animate("goIn")
		big[i].animate("fadeOut")
		big[8].animate("fadeIn")
		i = 9	
		

#rotate
	psd.small_circle.animate
		rotation: psd.small_circle.rotation +  45
		options: 
			curves: Bezier.easeOut
			time : 1
	for layer in psd.small_circle.children
		layer.animate
			rotation: layer.rotation - 45
			options: 
				curves: Bezier.easeOut
				time : 1
				


psd.time.onDoubleTap ->
	window.location.reload()



