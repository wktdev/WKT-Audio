var audioContext = new AudioContext();

function wktAudio(fileDirectory, numberOfOscillators, callback) {

    var oscillatorArr = [];
    var soundObj = {};
    var oscillator = audioContext.createOscillator();
    var loadedSound = undefined;


    for (var i = 0; i < numberOfOscillators; i += 1) {
        oscillatorArr.push(audioContext.createOscillator())
    }


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



    soundObj.play = function(time, setStart, setDuration) {

        oscillatorArr = [];

        loadedSound = audioContext.createBufferSource();

        if (soundObj.soundToPlay !== undefined) {

            loadedSound.buffer = soundObj.soundToPlay;
            loadedSound.start(audioContext.currentTime + time || 0, setStart || 0, setDuration || soundObj.soundToPlay.duration);

        }


        for (var i = 0; i < numberOfOscillators; i += 1) {
            oscillatorArr.push(audioContext.createOscillator())
        }


        for (var i = 0; i < oscillatorArr.length; i += 1) {
            oscillatorArr[i].start(audioContext.currentTime + time || 0);
        }


        if (typeof callback === "function") {
            return callback(loadedSound, oscillatorArr)
        } else {
            return loadedSound.connect(audioContext.destination)
        }
    }

    soundObj.stop = function(time) {

        if (soundObj.soundToPlay !== undefined) {
            loadedSound.stop(audioContext.currentTime);
        }

        for (var i = 0; i < oscillatorArr.length; i += 1) {
            oscillatorArr[i].stop(audioContext.currentTime + time || 0);
        }


    }

    return soundObj;
};

function wktAudioBatch(obj) {
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

    //________________________________________________________END array should only have 1 function, if more then throw error
    //________________________________________________________BEGIN find function and set to head of array

    var oldHead = arrayFromObj[0];


    for (var i = 0; i < arrayFromObj.length; i += 1) {

        if (typeof arrayFromObj[i] === "function") {

            arrayFromObj[0] = arrayFromObj[i];
            arrayFromObj[i] = oldHead;
        }

    }


    //________________________________________________________END find function and set to head of array




    //___________________________________________BEGIN find osc number 

    var oscArr = [];

    for (var i = 0; i < arrayFromObj.length; i += 1) {
        if (typeof arrayFromObj[i] === "number") {
            oscArr.push(arrayFromObj[i])

        }
    }

    oscArr.sort(function(a, b) {
        return a - b
    })

    var numberOfOscillators = oscArr[oscArr.length - 1];








    //____________________________________________END find osc number









    for (var prop in obj) {

        obj[prop] = wktAudio(obj[prop], numberOfOscillators, arrayFromObj[0]);
        counter += 1;
    }


    return obj
}