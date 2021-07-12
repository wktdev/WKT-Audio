"use strict";

var audioContext = new AudioContext();

function audioFileLoader(fileDirectory) {
    let soundObj = {};
    let playSound = undefined;
    let getSound = new XMLHttpRequest();
    soundObj.fileDirectory = fileDirectory;
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    };

    getSound.send();
    
    let nodeGraph;

    soundObj.connect = function(callback) {
        if (callback) {
            nodeGraph = callback;
        }
        return {
            play: soundObj.play,
            stop: soundObj.stop
        }
    }

    soundObj.play = function(time, setStart, setDuration) {
        playSound = audioContext.createBufferSource();
        playSound.buffer = soundObj.soundToPlay;
        playSound.start(audioContext.currentTime + time || audioContext.currentTime, setStart || 0, setDuration || soundObj.soundToPlay.duration);


        if (nodeGraph) {
            return nodeGraph(playSound);
        } else {
            return playSound.connect(audioContext.destination);
        }

    };

    soundObj.stop = function(time) {
        playSound.stop(audioContext.currentTime + time || audioContext.currentTime);
    };
    return soundObj;
}


function audioBatchLoader(obj) {
 

    for (let prop in obj) {
        obj[prop] = audioFileLoader(obj[prop]);

    }

    return obj;

}
