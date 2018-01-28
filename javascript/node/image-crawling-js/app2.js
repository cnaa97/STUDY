var Xray = require('x-ray');
var fs = require("fs");

var xray = new Xray();

xray('http://hn-hn.co.kr/','img',
	[{
		img:'@src',
		class:'@class',
		width:'@width',
		height:'@height'
	}]
)
(function(err, results){
	// var download = new Download();
	var filtered = [];
	results = results.filter(function(image){
		if(image.class === 'MS_prod_img_m'){
			filtered.push(image);
		}
		return image.class === 'MS_prod_img_m';
	})
	fs.writeFile('./results.json',JSON.stringify(filtered, null, '\t'));
})
