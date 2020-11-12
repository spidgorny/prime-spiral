var path = new Path.Rectangle({
	point: [75, 75],
	size: [75, 75],
	strokeColor: 'black'
});

var mcos = Math.cos;
var msin = Math.sin;
var msqrt = Math.sqrt;
var mmax = Math.max;

function getPolarPoint(distance, radian) {
	return {x: distance * mcos(radian) + midX, y: distance * msin(radian) + midY}
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

function update() {
	for (var i = 0; i < batchSize; i++) {
		draw(getPolarPoint(count * scalar, count), isPrime(count));
		count++;
	}
	if (count < max) {
		animCall = requestAnimationFrame(update);
	}
}

function handleZoomChange(e) {
	var id = e * 1;
	dotSize = id < 4 ? 1 : .1;
	cancelAnimationFrame(animCall);
	seed = seeds[id];
	max = midX * seed;
	scalar = 1 / seed;
	batchSize = mmax(3, seed / 5);
	ctx.clearRect(0, 0, canvasSize, canvasSize);
	count = 1;
	note.innerHTML = 'Showing primes up to <span>' + max.toLocaleString() + '</span>.<br>' + notes[id];
	animCall = requestAnimationFrame(update);
}

function onFrame(event) {
	// the number of times the frame event was fired:
	// console.log(event.count);

	// The total amount of time passed since
	// the first frame event in seconds:
	// console.log(event.time);

	// The time passed in seconds since the last frame event:
	// console.log(event.delta);

	path.rotate(3);
}
