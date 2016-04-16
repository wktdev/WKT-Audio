"use strict";


//_____This is nothing but a for-loop written in a functional style BUT it mutates data outside of it!





function loopIt(numberOfLoops, callback) {
    var counter = 1;

    function looper(start, stop) {
        callback();
        if (start < stop) {

            return looper(start += 1, stop);
        }
    }

    looper(counter, numberOfLoops);
}


/*_______________________EXAMPLE

var c = 0;

loopIt(10, function() {

    return c += 1

});

console.log(c); // 10

//______________________*/