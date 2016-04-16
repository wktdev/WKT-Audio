"use strict";

var audioContext = new AudioContext();

function wktAudio(fileDirectory, numberOfOscillators, callback) {

    var oscillatorArr = [],
        loadedSound = undefined,
        soundObj = {},
        oscillator = audioContext.createOscillator(),
        getSound = new XMLHttpRequest();




    loopIt(numberOfOscillators, function() {
        return oscillatorArr.push(audioContext.createOscillator());

    });


    soundObj.fileDirectory = fileDirectory;
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {


        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    };

    if (typeof fileDirectory === "string") {
        getSound.send();
    }



    soundObj.play = function(time, setStart, setDuration) {

        oscillatorArr = [];

        loadedSound = audioContext.createBufferSource();

        if (soundObj.soundToPlay !== undefined) {

            loadedSound.buffer = soundObj.soundToPlay;
            loadedSound.start(audioContext.currentTime + time || audioContext.currentTime, setStart || 0, setDuration || soundObj.soundToPlay.duration);

        }


        loopIt(numberOfOscillators, function() {
            return oscillatorArr.push(audioContext.createOscillator());
        });

        oscillatorArr.forEach(function(val, index) {
            return oscillatorArr[index].start(audioContext.currentTime + time || audioContext.currentTime);
        });




        if (typeof callback === "function") {

            return callback(loadedSound, oscillatorArr);

        } else {

            return loadedSound.connect(audioContext.destination);

        }
    };



    soundObj.stop = function(time) {

        if (soundObj.soundToPlay !== undefined) {
            loadedSound.stop(audioContext.currentTime + time || audioContext.currentTime);
        }


        oscillatorArr.forEach(function(val, index) {

            return oscillatorArr[index].stop(audioContext.currentTime + time || audioContext.currentTime);

        });

    };

    return soundObj;
}

function wktAudioBatch(obj) {

    //________________________________________________________BEGIN converted object to array
    var arrayFromObj = Object.keys(obj).map(function(key) {
        return obj[key];
    });
    //________________________________________________________END converted object to array

    //________________________________________________________BEGIN array should only have 1 function, if more then throw error


    function badInputCheck(arr) {

        var answer = arr.filter(function(val) {

            if (typeof val === "function") {
                return val;
            }
        });


        if (answer.length > 1) {


            throw new Error("WKT Audio: Only one function can be used");

        }

    }


    badInputCheck(arrayFromObj);

    //________________________________________________________END array should only have 1 function, if more then throw error
    //________________________________________________________BEGIN find function and set to head of array

    var oldHead = arrayFromObj[0];

    arrayFromObj.forEach(function(val, index) {

        if (typeof arrayFromObj[index] === "function") {

            arrayFromObj[0] = arrayFromObj[index];
            arrayFromObj[index] = oldHead;
        }
    });



    //________________________________________________________END find function and set to head of array




    //___________________________________________BEGIN find osc number 

    var oscArr = [];

    arrayFromObj.forEach(function(val, index) {

        if (typeof arrayFromObj[index] === "number") {
            oscArr.push(arrayFromObj[index]);

        }

    });


    oscArr.sort(function(a, b) {
        return a - b;
    });


    var numberOfOscillators = oscArr[oscArr.length - 1];


    //____________________________________________END find osc number


    for (var prop in obj) {

        obj[prop] = wktAudio(obj[prop], numberOfOscillators, arrayFromObj[0]);

    }

    return obj;
}