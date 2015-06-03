/*
from https://github.com/Raynos/throttle-function/blob/patch-1/index.js
*/

module.exports = throttle;

function throttle() { /* [?thisArg], fn, opts */
	var argmts = [].slice.call( arguments );
	var thisarg = argmts.length > 2 ? argmts.shift() : null;
	var fn = argmts[ 0 ];
	var opts = argmts[ 1 ] || {};

	var timer;
	var queue = [];
	var errMsg = 'Must pass options or milliseconds as second argument';
	if (!opts)
		throw new Error(errMsg);

	var msBetweenCalls;

	if (typeof opts == 'string')
		msBetweenCalls = Number(opts);

	else if (typeof opts == 'number')
		msBetweenCalls = opts;

	else {
		var window = opts.window || 1;
		var limit = opts.limit || 1;
		var exact = opts.exact || false;
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
		var args = dequeue();

		if (queue.length === 0 || !args) {
			clearInterval(timer);
			timer = null;
		}

		var result = fn.apply(thisarg, args);
		return result;
	}

	var throttled = function () {
		var args = [].slice.call(arguments);
		var position = enqueue(args);
		var timer = kickQueue();

		return {
			position: position,
			queuedAt: Date.now(),
			timeUntilCall: position * msBetweenCalls
		};
	};

	return throttled;
}
