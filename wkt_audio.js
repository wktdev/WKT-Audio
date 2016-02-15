var audioContext = new AudioContext();

function audioFileLoader(fileDirectory, callback) {


    var soundObj = {};

    var loadedSound = undefined;
    soundObj.fileDirectory = fileDirectory;
    var getSound = new XMLHttpRequest();
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {


        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    }

    if (typeof fileDirectory === "string") {
        getSound.send();
    }

    soundObj.play = function(time) {
        loadedSound = audioContext.createBufferSource();
        loadedSound.buffer = soundObj.soundToPlay;
        loadedSound.start(audioContext.currentTime + time || 0);


        return callback(loadedSound);
    }

    soundObj.stop = function() {
        loadedSound.stop(audioContext.currentTime);
    }

    return soundObj;
};

function wktAudio(obj) {
    var counter = 1;
    //________________________________________________________BEGIN converted object to array
    var arrayFromObj = Object.keys(obj).map(function(key) {
        return obj[key]
    });
    //________________________________________________________END converted object to array
    //________________________________________________________BEGIN array should only have 1 function, if more then throw error


    function badInputCheck(arr) {

        var answer = arr.filter(function(val) {

            if (typeof val === "function") {
                return val
            }
        })


        if (answer.length > 1) {


            throw new Error("WKT Audio: Only one function can be used")

        }

    }


    badInputCheck(arrayFromObj);

    //________________________________________________________BEGIN array should only have 1 function, if more then throw error
    //________________________________________________________BEGIN find function and set to head of array

    var oldHead = arrayFromObj[0];

    for (var i = 0; i < arrayFromObj.length; i += 1) {

        if (typeof arrayFromObj[i] === "function") {

            arrayFromObj[0] = arrayFromObj[i];
            arrayFromObj[i] = oldHead;
        }

    }


    //________________________________________________________END find function and set to head of array





    for (var prop in obj) {

        obj[prop] = audioFileLoader(obj[prop], arrayFromObj[0]);
        counter += 1;
    }
    console.log(obj);

    return obj
}