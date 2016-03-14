//___________________________________________________________________________________________BEGIN Oscillator example

var resourcesOsc = {
    osc: 11, // ________________________________Number of oscillators

    nodes: function nodeGraph(sound, osc) {

        var saw = osc[0]; //____________________Number of oscillators expressed as an array
        saw.type = "sawtooth";
        saw.frequency.value = 46;
        var tri = osc[1]; //____________________Number of oscillators expressed as an array
        tri.type = "triangle";
        tri.frequency.value = 182;
        tri.connect(audioContext.destination);
        saw.connect(audioContext.destination);

    }
}




var synth = wktAudioBatch(resourcesOsc);






$(function() {


    $(".osc").mousedown(function() {
        synth.osc.play();
    })

    $(".osc").mouseup(function() {
        synth.osc.stop();
    })



})



//___________________________________________________________________________________________END Oscillator example


//___________________________________________________________________________________________BEGIN Audio buffer example

var resourcesSounds = {
    loop: "sounds/drum_loop.mp3", // ________________________________Audio file directory
    snare: "sounds/snare.mp3", // ___________________________________Audio file directory

    nodes: function nodeGraph(sound, osc) {

        sound.connect(audioContext.destination)

    }
}




var sounds = wktAudioBatch(resourcesSounds);







$(function() {



    $(".loop").mousedown(function() {
        sounds.loop.play(3);
    })

    $(".loop").mouseup(function() {
        sounds.loop.stop();
    })


    $(".snare").mousedown(function() {
        sounds.snare.play();
    })

    $(".snare").mouseup(function() {
        sounds.snare.stop();
    })




})

//___________________________________________________________________________________________END Audio buffer example




//__________________________________________________________________________________________START loop single



var loop = wktAudio('sounds/drum_loop.mp3');






$(function() {



    $(".loop-single").mousedown(function() {
        loop.play()
    })

    $(".loop-single").mouseup(function() {
        loop.stop();
    })



})

//____________________________________________________________________________________________END loop single