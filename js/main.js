var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var buttons = [
	[["Tap To Start", 0, 0, 100, 100, function() {start(); menu = 1}, true, false]],
	
	[["||", 0, 0, 10, 10, function() {menu = 0}, true, false],
	 ["", 0, 0, 50, 50, function() {if(pers.y > 0) pers.y--}, false, false],
	 ["", 0, 50, 50, 50, function() {if(pers.y < 4) pers.y++}, false, false],
	 ["", 50, 0, 50, 100, function() {if(pers.candy > 0) {pers.c = true; pers.candy--; at = 10;} }, false, false]]
];

//var gr = new Image();
//gr.src = "gr.png";
cvs.width = window.innerWidth;
cvs.height = window.innerHeight + 2;

document.getElementById('canvas').addEventListener('click', function(event){action(event.clientX, event.clientY)}, false);
document.addEventListener('keydown', function(event) {
if(event.keyCode == 83) buttons[1][2][5]();
if(event.keyCode == 87) buttons[1][1][5]();
if(event.keyCode == 32) buttons[1][3][5]();
}, false);

var menu = 0;
var textColor = "rgba(200, 220, 1)";//настройки стиля
var background = "rgb(100, 100, 100)";
var backgroundBut = "rgba(0,0,0,0.5)";
var stop = true;
var yamaColor = "rgba(0,0,0,0.5)";
var backMusic = new Audio();
backMusic.src = "sound/background.mp3";

pers = {"x" : 0,
		"y" : 2,
		"candy" : 5,
		"c" : false,
		"life" : 5,
		"pic" : new Image()
};
pers.pic.src = "img/rak.png";

opPic = new Image();
opPic.src = "img/head.png";
function opsh(x, y) {
	this.x = x;
	this.y = y;
}
oponents = [new opsh(wper(100)+rand(100, 1000), rand(0,4)), 
new opsh(wper(100)+rand(100, 1000), rand(0,4)),
new opsh(wper(100)+rand(100, 1000), rand(0,4)),
new opsh(wper(100)+rand(100, 1000), rand(0,4)),
 new opsh(wper(100)+rand(100, 1000), rand(0,4))]

backgroundImg = new Image();
backgroundImg.src = "img/background.png";

rach = new Image();
rach.src = "img/rachok.png";

function wper(wper_pers) {//получение ширины по процентам
		return parseInt((cvs.width/100) * wper_pers);
}

function hper(hper_pers) {//высоты по процентам
		return parseInt((cvs.height/100) * hper_pers);
}

function rand(min, max) {//получение случайного чила в диапазоне
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTextWidth(text, font) {//получение ширины строки с текстоим в пикселях
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function collTest(obj1, obj2) {
	//var ob1 = [[obj1[0], obj1[1]], [obj1[0] + obj1[2], obj1[1]], [obj1[0] + obj1[2], obj1[1] + obj1[3]], [obj1[0], obj1[1] + obj1[3]]];
	//var ob2 = [[obj2[0], obj2[1]], [obj2[0] + obj2[2], obj2[1]], [obj2[0] + obj2[2], obj2[1] + obj2[3]], [obj2[0], obj2[1] + obj2[3]]];
	if(obj1 == undefined) {
		console.log(obj1);
		console.log(obj2);
		console.log(stop);
	}
	var XColl=false;
	var YColl=false;

	if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
	if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;

	if (XColl&YColl){return true;}
	return false;
}	

function draw_but(text, startx, starty, endx, endy, persNum, drawBack) {//функция рисования кнопки
	if(persNum) {
		if(drawBack) {
			ctx.fillStyle = backgroundBut;
			ctx.fillRect(wper(startx), hper(starty), wper(endx), hper(endy));//30 25 40 10
		}
		ctx.fillStyle = textColor;
		if(text != "undefined") ctx.fillText(text, wper(startx) + (wper(endx)/2 - getTextWidth(text, ctx.font)/2), hper(starty) + ((hper(endy)/2)));// 31 30 
	}
}

function textInButton(text, startx, starty, endx, endy) {//рисование текста
	ctx.font = String(hper(4)) + "px Verdana";
	ctx.fillText(text, wper(startx) + (wper(endx)/2 - getTextWidth(text, ctx.font)/2), hper(starty) + (hper(6)));
}

function butTest(x, y, sx, sy, lx, ly) {//проверка нажатия в область
		if((x > sx) && (x < sx + lx) && (y > sy) && (y < sy + ly)) {
			return true;
		} else {
			return false;
		}
}

function start() {
	
}

function saveStat() {
	
}

function loadStat() {

}

function action(x, y) {
	for(i = 0; i < buttons[menu].length; i++) {
		if(butTest(x, y, wper(buttons[menu][i][1]), hper(buttons[menu][i][2]), wper(buttons[menu][i][3]), hper(buttons[menu][i][4]))) {
				buttons[menu][i][5]();
				break;
		} 
	}
}
sm = cvs.width;
timer = 0;
ctx.font = String(hper(4)) + "px Verdana";
score = 0;
at = 0;
function draw() {
	//ctx.fillStyle = "#111111";
	//ctx.fillRect(0, 0, cvs.width, cvs.height);
	ctx.drawImage(backgroundImg, 0-sm, 0, cvs.width, cvs.height);
	ctx.drawImage(backgroundImg, cvs.width-sm, 0, cvs.width, cvs.height);
	if(sm >= cvs.width) {
		sm = 0;
	} else {
		sm += wper(1);
	}
	if(menu == 0) {
		for(i = 0; i < buttons[menu].length; i++) {
			if(buttons[menu][i][6]) draw_but(buttons[menu][i][0], buttons[menu][i][1], buttons[menu][i][2], buttons[menu][i][3], buttons[menu][i][4], buttons[menu][i][6], buttons[menu][i][7]);
		}
	}
	if(menu == 1) {
		for(i = 0; i < buttons[menu].length; i++) {
			if(buttons[menu][i][6]) draw_but(buttons[menu][i][0], buttons[menu][i][1], buttons[menu][i][2], buttons[menu][i][3], buttons[menu][i][4], buttons[menu][i][6], buttons[menu][i][7]);
		}/*
		ctx.drawImage(opPic, oponents[0].x, (hper(100)/5) * oponents[0].y, wper(20), hper(100)/5); 
		ctx.drawImage(opPic, oponents[1].x, (hper(100)/5) * oponents[1].y, wper(20), hper(100)/5); 
		ctx.drawImage(opPic, oponents[1].x, (hper(100)/5) * oponents[1].y, wper(20), hper(100)/5); 
		oponents[0].x -= hper(1);
		oponents[1].x -= hper(1);
		oponents[2].x -= hper(1);*/
		for(i = 0; i < oponents.length; i++) {
			ctx.drawImage(opPic, oponents[i].x, (hper(100)/5) * oponents[i].y, hper(100)/5, hper(100)/5); 
			oponents[i].x -= wper(1) + wper(score/1000);
			if(oponents[i].x < hper(20) && oponents[i].x > hper(1) && oponents[i].y == pers.y) {
				location.reload();
			} else if((oponents[i].x + wper(20)) < 0 || (at > 0 && oponents[i].y == pers.y)) {
				oponents[i].x = cvs.width+rand(100, 1000);
				oponents[i].y = rand(0,4);
				score += 10;
			} 
		}
		if(pers.c || at > 0) {
			at--;
			for(i = 1; i < 5; i++) ctx.drawImage(rach, wper(20)*i, (hper(100)/5) * pers.y, wper(20), hper(100)/5); 
		}
		
		ctx.drawImage(pers.pic, 0, (hper(100)/5) * pers.y, wper(20), hper(100)/5); 
		ctx.fillStyle = "#000000";
		ctx.fillRect(wper(70), hper(1), wper(20), hper(10));
		ctx.fillStyle = "#aa1111";
		ctx.fillRect(wper(71), hper(2), wper(3.6)*pers.candy, hper(8));
		ctx.fillStyle = "#ffffff";
		//textInButton("Score: " + String(score*10), wper(10), 0, wper(60), hper(10)); 
		ctx.fillText("Score: " + String(parseInt(score)), wper(11), hper(6)); 
		score += 0.1;
	}
	pers.c = false;
	timer++;
	if(timer > 50) {
		if(pers.candy < 5) pers.candy++;
		timer = 0;	
	}
	requestAnimationFrame(draw);
}

backMusic.play();
backMusic.s = false;
setInterval(function() {if(backMusic.paused == true && backMusic.s == false)backMusic.play()}, 100);

draw()





