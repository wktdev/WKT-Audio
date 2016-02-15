# Web-Audio-API-file-loader-2
Web Audio API file loader with customizable node graph for each loaded file or batch.


## Example

    
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
    
    
    
    var sound = wktAudio(resources);
    
    
    
    
    
    $(function() {
    
        $(".snare").click(function() {
            sound.snare.play();
        })
    
        $(".loop").click(function() {
            sound.drum.play();
        })
    
    
    })
    
    
    
