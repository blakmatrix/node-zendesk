/*
from https://github.com/Raynos/throttle-function/blob/patch-1/index.js
*/

module.exports = throttle;

function throttle(thisArg, fn, opts = {}) {
	const errMsg = 'Must pass options or milliseconds as second argument';
	const queue = [];

	let timer;
	let window, limit, exact;

	if (!opts)
		throw new Error(errMsg);

	var msBetweenCalls;

	if (typeof opts == 'string')
		msBetweenCalls = Number(opts);

	else if (typeof opts == 'number')
		msBetweenCalls = opts;

	else {
		window = opts.window || 1;
		limit = opts.limit || 1;
		exact = opts.exact || false;
		msBetweenCalls = Math.ceil((window / limit) * 1000);
	}

	if (isNaN(msBetweenCalls))
		throw new Error(errMsg);

	function enqueue(args) {
		return queue.push(args);
	}

	function dequeue() {
		return queue.shift();
	}

	function kickQueue() {
		if (timer) return timer;
		timer = setInterval(runQueue, msBetweenCalls);
		return timer;
	}

	function runQueue() {
		const args = dequeue();

		if (queue.length === 0 || !args) {
			clearInterval(timer);
			timer = null;
		}

		return fn.apply(thisArg, args);
	}

	const throttled = function (...args) {
		let position = enqueue(args);
		let timer = kickQueue();

		return {
			position,
			queuedAt: Date.now(),
			timeUntilCall: position * msBetweenCalls
		};
	};

	return throttled;
}
