// Yi Cui
let transformX = 0; // x position of note
let transformY = 0; // y position of note
let noteRotate = 20; // rotation of note
let noteSpeed = 5; // speed of movement for note
let noteDiameter = 6;// diameter of note
let noteLength = 20;// length of note

let speed = 0.0005;// speed of movement for face symbol
let angle = 0;// angle of movement for face symbol

function setup() {
	createCanvas(windowWidth, windowHeight);
	transformX = random(0, width);
	frameRate(30); // sets a consistent frame rate
}

function preload() {
	// insert album cover image
	img1 = loadImage('nirvana.jpg');
	// insert button image
	img2 = loadImage('nirvana_2.jpg');
}

function draw() {
	fill(168, 64, 76, 50);
	noStroke();
	// fill with alpha to create the "trail" effect
	rect(0, 0, width, height); // rect that is same size as canvas
	if (mouseIsPressed && mouseX > width * 0.85 && mouseY > height * 0.85 ) { 
		transformX = random(0, width);
		transformY = -50;
		noteRotate = random(-30, 30);
		noteLength = random(20, 30);
		noteDiameter = random(6, 8);
		noteSpeed = 5;
	}

	push();
	translate(transformX + (sin(map(transformY,0,height,0,8*PI)) * 15), transformY);
	//question: what is sin(transformY)? Thought the parameter usualy is some degrees
	stroke("black");
	strokeWeight(4);
	fill('black');
	rotate(radians(noteRotate));
	line(noteDiameter, 0, noteDiameter, noteLength);
	circle(noteDiameter / 2, noteLength, noteDiameter);
	pop();
	transformY += noteSpeed;
	if (transformY>height){
		noteSpeed = 0;// stops the note if it reaches the bottom of the screen
	}

	// set up diameter 
	let diameter = 200;

	// draw the back side of the album
	noStroke();
	fill(94, 74, 58);
	beginShape();
	vertex(width * 0.5 - 200, height * 0.5 - 120);
	vertex(width * 0.5, height * 0.5 - 150);
	vertex(width * 0.5 + 5, height * 0.5 - 120);
	endShape();
	// if mouse is pressed, the record gets bigger by 1.25 times
	// since I don't want the center of the record to change, I change the value of diameter instead of using "scale"
	if (mouseIsPressed) {
		if (dist(mouseX, mouseY, width / 2, height / 2) <= 100) {
			noStroke();
			fill(240, 233, 216);
			circle(width / 2, height / 2, diameter * 1.25);
			diameter *= 1.2;
		}
	}
	// draw the record
	fill('black');
	circle(width / 2, height / 2, diameter);
	fill(240, 233, 216);
	circle(width / 2, height / 2, diameter * 3 / 8);
	fill(163, 26, 42);
	arc(width / 2, height / 2, diameter * 7 / 20, diameter * 7 / 20, 0, PI);
	fill('black');
	circle(width / 2, height / 2, diameter * 0.1);
	fill(237, 208, 159);
	stroke(94, 74, 58);
	strokeWeight(5);
	rect(width * 0.5 - 200, height * 0.5 - 120, 230, 230);
	textSize(40);
	noStroke();
	fill('black');
	text('Nirvana', width * 0.5 - 190, height * 0.48);
	image(img1, width * 0.5 - 200, height * 0.5 - 5, 230, 115);
	image(img2, width * 0.85, height * 0.85, width * 0.15, height * 0.15);
	strokeWeight(8);
	stroke('white');
	line(width * 0.5 - 200, height * 0.5 + 150, width * 0.5 + 30, height * 0.5 + 150);
	// Song time display
	if (mouseX > width * 0.5 - 200 && mouseX < width * 0.5 + 30 && mouseY > height * 0.5 + 145 && mouseY < height * 0.5 + 155) {
		stroke(94, 74, 58);
		strokeWeight(4);
		line(width * 0.5 - 200, height * 0.5 + 150, mouseX, height * 0.5 + 150);
		textSize(15);
		noStroke();
		let start = map(mouseX - (width * 0.5 - 200), 0, 230, 0, 300);// convert mouthX to song time(5:00 in total)
		let start1 = int(start / 60);// minute
		let start2 = int(start % 60);// second
		if (start2 < 10) {// add "0" if second < 10
			text(start1, width * 0.5 - 250, height * 0.5 + 155);
			text(":", width * 0.5 - 243, height * 0.5 + 155);
			text("0", width * 0.5 - 238, height * 0.5 + 155);
			text(start2, width * 0.5 - 230, height * 0.5 + 155);
		} else {
			text(start1, width * 0.5 - 250, height * 0.5 + 155);
			text(":", width * 0.5 - 243, height * 0.5 + 155);
			text(start2, width * 0.5 - 238, height * 0.5 + 155);
		}
		let end1 = map((width * 0.5 + 30) - mouseX, 0, 230, 0, 300);
		let end2 = int(end1 / 60);// minute
		let end3 = int(end1 % 60);// second
		if (end3 < 10) {// add "0" if second < 10
			text(end2, width * 0.5 + 50, height * 0.5 + 155);
			text(":", width * 0.5 + 57, height * 0.5 + 155);
			text("0", width * 0.5 + 62, height * 0.5 + 155);
			text(end3, width * 0.5 + 70, height * 0.5 + 155);
		} else {
			text(end2, width * 0.5 + 50, height * 0.5 + 155);
			text(":", width * 0.5 + 57, height * 0.5 + 155);
			text(end3, width * 0.5 + 62, height * 0.5 + 155);
		}
	}
	noStroke();
	fill('white');
	triangle(width * 0.5 - 85, height * 0.5 + 180, width * 0.5 - 85, height * 0.5 + 200, width * 0.5 - 65, height * 0.5 + 190);
	if (mouseIsPressed) {
		if (mouseX > width * 0.5 - 85 && mouseX < width * 0.5 - 65 && mouseY > height * 0.5 + 180 && mouseY < height * 0.5 + 200) {
			drawFace();// calling the face symbol drawing function from draw()
		}
	}

	if (mouseX > width * 0.5 - 150 && mouseX < width * 0.5 - 30 && mouseY > height * 0.5 - 5 && mouseY < height * 0.5 + 110) {
		// when mouse hovering the album picture, generate guitar patterns randomly
		let guitarX = random(0, width);
		let guitarY = random(0, height);
		let scaleFactor = random(1, 2);
		push();
		translate(guitarX, guitarY);
		scale(scaleFactor);
		stroke("black");
		strokeWeight(4);
		noFill();
		line(0, 0, 0, 15);
		strokeWeight(2);
		beginShape();
		vertex(-5, 12);
		quadraticVertex(0, 20, 6, 10);
		quadraticVertex(8, 15, 3, 20);
		arc(0, 25, 15, 10, radians(-45), radians(180 + 45));
		endShape();
		line(-4, 20, -5, 12);
		pop();

	}
}

function drawFace() {// this is a function that draws face symbol 
	translate(50, 50); // move the coordinate grid to 50,50
	for (let y = 0; y < height; y += 100) { // create a variable called y. loop the code below as long as y is less than height. increase y by 100 with each loop.
		for (let x = 0; x < width; x += 100) { // create a variable called x. loop the code below as long as x is less than width. increase x by 100 with each loop.
			stroke(242, 224, 90);
			hue = map(y, 0, height, 200, 50);// decrease hue by height
			fill(hue);
			push();
			translate(x, y);
			rotate(angle);
			angle += speed;
			let scaleFactor = map(y, 0, height, 0.8, 1.2);// increase scale by height
			scale(scaleFactor);
			strokeWeight(5);
			circle(0, 0, 100); //face
			strokeWeight(3);
			line(-20, -20, -10, -10); //left eye
			line(-20, -10, -10, -20);//left eye
			line(10, -15, 20, -25); //right eye
			line(10, -25, 20, -15);//right eye
			arc(-15, 10, 20, 20, PI * 0.5, PI); // the code following draws the mouth 
			arc(0, 20, 30, 20, PI * 0.5, PI); 
			arc(5, 30, 15, 8, PI, radians(-40));
			arc(10, 8, 30, 40, radians(-20), PI * 0.5);
			arc(26, 24, 10, 10, radians(-140), PI);
			line(21, 20, 26, 25);
			arc(-23, 12, 20, 10, PI, PI * 1.5);
			arc(23, 5, 15, 10, radians(-100), radians(-10));
			pop();
		}
	}
}