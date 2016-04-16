# WKT Audio
Web Audio API file loader with customizable node graph for each loaded file or batch. It also allows you to create oscillators with custom node graphs. 


## The simplest use case example

    //_____________________________________________________________START file single
    
    var loop = wktAudio('sounds/drum_loop.mp3'); // load a single file
    
    
    $(function() {
    
    
    
        $(".loop-single").mousedown(function() {
            loop.play();   // play it
        })
    
        $(".loop-single").mouseup(function() {
            loop.stop();  // stop it
        })
    
    
    
    })
    
    //______________________________________________________________END file single









## More complicated examples 
### "Load" oscillators


    //______________________________________________________________________BEGIN Oscillator example


    var resourcesOsc = {
        osc: 10, // ________________________________Number of oscillators
    
        nodes: function nodeGraph(sound, osc) {
            var saw = osc[0]; //____________________Number of oscillator expressed as an array index
            var tri = osc[1]; //____________________Number of oscillator expressed as an array index
            saw.type = "sawtooth";
            saw.frequency.value = 46;
            tri.type = "triangle";
            tri.frequency.value = 182;
            tri.connect(audioContext.destination);
            saw.connect(audioContext.destination);
    
        }
    };
    
    
    var synth = wktAudioBatch(resourcesOsc);
    
    
    $(function() {
    
    
        $(".osc").mousedown(function() {
            synth.osc.play();
        });
    
        $(".osc").mouseup(function() {
            synth.osc.stop();
        });
    
    
    
    });

    //______________________________________________________________________END Oscillator example
    
    
    
###Load a batch of audio files with customized node graph
    
    
    
    
    //__________________________________________START Example of loading a batch of files with customized node graph 
    
    
    var resources = {
    
    
        snare: "sounds/snare.mp3",
        drum: "sounds/drum_loop.mp3",
        nodes: function nodeGraph(sound) {
    
            var gain = audioContext.createGain();
            gain.gain.value = 0.5;
            sound.connect(gain);
            gain.connect(audioContext.destination);
    
    
        }
    }
    
    
    
    var sound = wktAudioBatch(resources);
    
    
    
    
    
    $(function() {
    
        $(".snare").click(function() {
            sound.snare.play();
        })
    
        $(".loop").click(function() {
            sound.drum.play();
        })
    
    
    
    })
    

        
    //__________________________________________END Example of loading a batch of files with customized node graph


