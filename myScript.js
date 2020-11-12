paper.view.zoom = 2;
// var box = new Path.Rectangle({
// 	point: [75, 75],
// 	size: [75, 75],
// 	strokeColor: 'white'
// });
var dot = new Path.Circle({
	center: [0, 0],
	radius: 2,
	fillColor: 'white',
	// strokeColor: 'black'
});

var mcos = Math.cos;
var msin = Math.sin;
var msqrt = Math.sqrt;
var mmax = Math.max;

var animCall;
var seed;
var count = 1;
var dotSize = 2;
var batchSize = 10;
var canvasSize = mmax(paper.view.size.width, paper.view.size.height);
var midX = canvasSize / 2;
var midY = canvasSize / 2;

var playing = true;

function testCoordinates() {
	var myPathX = new Path();
	myPathX.strokeColor = 'white';
	myPathX.add(new Point(midX - 100, midY));
	myPathX.add(new Point(midX + 100, midY));

	var myPathY = new Path();
	myPathY.strokeColor = 'white';
	myPathY.add(new Point(midX, midY - 100));
	myPathY.add(new Point(midX, midY + 100));

	// line
	// for (var i = 0; i < canvasSize; i++) {
	// 	draw(midX + i, midY + i);
	// }

	// spiral
	// for (var i = 0; i < canvasSize; i++) {
	// 	var point = getPolarPoint(i/10, i/180);
	// 	draw(point.x, point.y);
	// }
}

function handleZoomChange(id) {
	cancelAnimationFrame(animCall);
	animCall = requestAnimationFrame(update);
}

function update() {
	// console.log(paper.view);
	paper.view.zoom *= 0.99;
	var startTime = new Date();
	for (var i = 0; i < batchSize; i++) {
		var point = getPolarPoint(count, count);
		if (isPrime(count)) {
			draw(point.x, point.y);
		}
		count++;
	}

	var duration = new Date().getTime() - startTime.getTime();
	if (duration > 1000 / 60) {
		batchSize *= 0.99;
	} else {
		batchSize *= 1.01;
	}

	if (playing && count < 100000) {
		animCall = requestAnimationFrame(update);
	}
}

function getPolarPoint(distance, radian) {
	return {
		x: distance * mcos(radian) + midX,
		y: distance * msin(radian) + midY
	};
}

function draw(x, y) {
	var symbol = new Symbol(dot);
	symbol.place(new Point(x, y));
}

function isPrime(num) {
	if (num <= 1) return false; // negative
	if (num % 2 == 0 && num > 2) return false; // even
	var s = msqrt(num);
	for (var i = 3; i <= s; i++) {
		if (num % i === 0) return false; // divisor
	}
	return true;
}

function onFrame(event) {
	// the number of times the frame event was fired:
	// console.log(event.count);

	// The total amount of time passed since
	// the first frame event in seconds:
	// console.log(event.time);

	// The time passed in seconds since the last frame event:
	// console.log(event.delta);

	// box.rotate(3);
}

testCoordinates();
handleZoomChange(0);
