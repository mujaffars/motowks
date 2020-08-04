/*var introSound = document.createElement('audio');
var tapSound = document.createElement('audio');
var tapBackSound = document.createElement('audio');
var ansRevealSound = document.createElement('audio');
var lvlclearSound = document.createElement('audio');
var lvlSelectSound = document.createElement('audio');
var pathToSound = 'sound/';

introSound.id = "introSound";
introSound.appendChild(setSoundSource("intro"));
introSound.preload = "auto";

tapSound.id = "tapSound";
tapSound.appendChild(setSoundSource("tap"));
tapSound.preload = "auto";

tapBackSound.id = "tapBackSound";
tapBackSound.appendChild(setSoundSource("tapBack"));
tapBackSound.preload = "auto";

lvlclearSound.id = "lvlclearSound";
lvlclearSound.appendChild(setSoundSource("lvlclear"));
lvlclearSound.preload = "auto";

ansRevealSound.id = "ansReveal";
ansRevealSound.appendChild(setSoundSource("ansReveal"));
ansRevealSound.preload = "auto";

lvlSelectSound.id = "lvlclearSound";
lvlSelectSound.appendChild(setSoundSource("lvlSelect"));
lvlSelectSound.preload = "auto";

function setSoundSource(filenameWithoutExtension)
{
    //create a dummy audio object to see what this browser supports
    var dummyAudio = document.createElement('audio');

    var source = document.createElement('source');
    if (dummyAudio.canPlayType('audio/mpeg;')) {
        source.type = 'audio/mpeg';
        source.currentTime = 0;
        source.src = pathToSound + 'mp3/' + filenameWithoutExtension + ".mp3";
    } else {
        source.type = 'audio/wav';
        source.currentTime = 0;
        source.src = pathToSound + filenameWithoutExtension + ".wav";
    }
    return source;
}