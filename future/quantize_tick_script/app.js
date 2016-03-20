"use strict"


function quantize(num) {
    var answers = [];

    for (var i = 0; i < num; i += 1) {
        answers.push(480 / (i + 1));
    }

    var lastVal = answers.length - 1;
    return answers;
}

console.log(quantize(3));

// If tick === any of these values then beep a mentronone.

console.log();