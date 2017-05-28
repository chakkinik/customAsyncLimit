a = require("async");

array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//var interval = 1000;
var interval = [5000, 1000, 100, 1000, 500, 2000, 1000, 1000, 1000, 100, 100];
/*a.eachLimit(array, 12,function(i, cb) {
	setTimeout(()=>{console.log(i); cb()}, interval[i-1]);
}, function(err) {
	console.log("done");
});*/



// each limit we got array and limit 

function EachLimit(limits) {

	return function(array, fx, fn) {

		var callback = callback || function() {};
		if (!array && !array.length < 0 || !limits) {
			return callback();
		}
		// run the loop till array
		// run till limit 

		var completed = 0;
		var started = 0;
		var running = 0;

		(function final() {
			if (completed > array.length - 1) {
				return callback();
			}


			
			while (running < limits && started < array.length) {
				running += 1;
				started += 1;
				fx(array[started - 1], function(err) {
					if (err) {
						running -= 1
						completed += 1;
						callback(err);
						callback = function() {};

					} else {
						running -= 1
						completed = +1
						if (completed >= array.length) {
							callback();

						} else {
							final();
						}
					}
				})
			}
		})();

	}

}


function customEachLimit(array, limits, fx, fn) {

	var fn = EachLimit(limits);

	console.log(fn)

	fn.call(null, array, fx, fn);
};


customEachLimit(array, 2, function(i, cb) {
setTimeout(() => {
	console.log(i);
	cb()
}, interval[i - 1])
}, function(err) {
console.log('done')
});