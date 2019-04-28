var track1Volume;
var track2Volume;



var player1;
var player2;

var vid1id;
var vid2id;

function getYTid1() {
    var url1 = document.getElementById("yt-vid1-url").value;
    url1 = url1.split("v=", 2);
    vid1id = url1[1];
    player1.cueVideoById(vid1id);
}

function getYTid2() {
    var url2 = document.getElementById("yt-vid2-url").value;
    url2 = url2.split("v=", 2);
    vid2id = url2[1];
    player2.cueVideoById(vid2id);
}

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('track1', {
        width: 600,
        height: 400,
        videoId: '6f2XIs9_a3M',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });

    player2 = new YT.Player('track2', {
        width: 600,
        height: 400,
        videoId: 'ISy0Hl0SBfg',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize() {

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
        $('#prog1').attr('aria-valuenow', parseInt(updateProgressBar()));
    }, 1000)

}

function showVal(newVal) {
    track2Volume = newVal;
    track1Volume = 100 - newVal;

    document.getElementById("valtrack2").innerHTML = newVal;
    document.getElementById("valtrack1").innerHTML = 100 - newVal;

    player1.setVolume(100 - document.getElementById("crossfader-input").value);
    player2.setVolume(document.getElementById("crossfader-input").value);
}

function player1Progress() {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player1.getDuration() * (document.getElementById("progress-bar1").value / 100);

    // Skip video to new time.
    player1.seekTo(newTime);

};

// This function is called by initialize()
function updateProgressBar() {
    // Update the value of our progress bar accordingly.
    console.log((player1.getCurrentTime() / player1.getDuration()) * 100);
}

function vid1playpause() {
    if (document.getElementById('play-button-1').innerHTML === 'Play(W)') {
        player1.playVideo();
        document.getElementById('play-button-1').innerHTML = 'Pause(W)';
    } else {
        player1.pauseVideo();
        document.getElementById('play-button-1').innerHTML = 'Play(W)';
    }
}

function vid2playpause() {
    if (document.getElementById('play-button-2').innerHTML === 'Play(O)') {
        player2.playVideo();
        document.getElementById('play-button-2').innerHTML = 'Pause(O)';
    } else {
        player2.pauseVideo();
        document.getElementById('play-button-2').innerHTML = 'Play(O)';
    }
}

$(document).on("keypress", function (w) {
    if(w['keyCode'] === 119){
        vid1playpause();
    }else if(w['keyCode'] === 111){
        vid2playpause();
    }
});


