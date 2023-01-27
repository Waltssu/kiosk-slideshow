// variables
var container = document.getElementById("ssContainer"); // slideshow container
var selectedMedia = 0; // selected image index
var allMedia = container.querySelectorAll(".mediaContainer"); // all media
var videos = document.getElementsByTagName("video"); // all video elements
var intervalId; // ID for interval

// media change function, can be called by timer
function changeMedia() {
  // animate old picture to slide out from the frame
  $(allMedia[selectedMedia]).animate({ left: "-100%" }, 1000);

  // if to prevent going "over" the list of imgs
  if (selectedMedia == 3) {
    selectedMedia = 0;
  } else {
    selectedMedia++;
  }

  // reset all positions to right to reset animation
  allMedia.forEach((media) => {
    media.style.left = "100%";
  });

  // animate new picture to slide into the frame
  $(allMedia[selectedMedia]).animate({ left: "0%" }, 1000);
}

// start timer, calls changeMedia
function startTimer() {
  intervalId = setInterval(() => {
    // call function every 10 seconds
    changeMedia();
    checkDuration(allMedia[selectedMedia]);
  }, 15000);
}

// stop timer
function stopTimer() {
  clearInterval(intervalId);
}

// continue timer (stop and start)
function continueTimer() {
  stopTimer();
  startTimer();
}

// pause slideshow for the duration of the video
function checkDuration(media) {
  // select correct child node (at index 1)
  let child = media.childNodes[1];

  // check if media is video
  if (child.className === "ssVideo") {
    // set video duration to milliseconds and subtract 850ms from total length
    // this is because the transition takes 1 seconds so picture change will be smoother
    let videoDur = child.duration * 1000 - 1000;

    console.log("video detected, pausing for:", videoDur);
    // pause video to reset playtime to beginning
    child.pause();

    // set current time to beginning (zero)
    child.currentTime = 0;

    // play video
    child.play();

    // clear interval to pause slideshow
    stopTimer();

    // timeout for the length of the video
    setTimeout(() => {
      // call media change function at the end of the timeout
      changeMedia();
      // continue interval
      continueTimer();
    }, videoDur);

    // else if media includes longer class (important info for ex.)
  } else if (child.className === "longer") {
    // stop slideshow
    stopTimer();
    // timeout
    setTimeout(() => {
      // change media after 35 seconds
      changeMedia();
      // continue interval
      continueTimer();
    }, 35000);
  }
}

// start slideshow on window load
window.addEventListener("load", startTimer);

// disable text selection to prevent accidental "blue screen"
document.body.style.userSelect = "none";
