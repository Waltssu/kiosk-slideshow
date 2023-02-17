// variables
var container = document.getElementById("ssContainer"); // slideshow container
var selectedMedia = 0; // selected image index
var allMedia = container.querySelectorAll(".mediaContainer"); // all media
var videos = document.getElementsByTagName("video"); // all video elements
var arrowLeft = document.getElementById("arrowLeft"); // left arrow
var arrowRight = document.getElementById("arrowRight"); // right arrow
var intervalIDs = []; // array of interval IDs
var animDuration = 30000;


// media change function, can be called by timer
function changeMedia() {
  // animate old picture to slide out from the frame
  $(allMedia[selectedMedia]).animate({ left: "-100%" }, 250);

  // if to prevent going "over" the list of imgs
  if (selectedMedia == allMedia.length - 1) {
    selectedMedia = 0;
  } else {
    selectedMedia++;
  }

  // select next media child element from mediacontainer
  // to check if its video or not
  const nextElement = allMedia[selectedMedia].children[0];

  if (nextElement.tagName === "VIDEO") {
    // get video duration and multiply to get amout of milliseconds
    let videoDuration = (nextElement.duration * 1000) - 800;
    // stop slideshow and reset video playback to beginning of video
    clearInterval(intervalID);
    nextElement.pause();
    nextElement.currentTime = 0;
    nextElement.play();
    // timeout for the duration of the video
    setTimeout(function () {
      // reset interval to start over
      callMediaChange();
      // call for the media change function
      changeMedia();
    }, videoDuration);
  }


  // reset all positions to right to reset animation
  allMedia.forEach((media) => {
    media.style.left = "100%";
  });

  // animate new picture to slide into the frame
  $(allMedia[selectedMedia]).animate({ left: "0%" }, 250);
}

// function to clear all intervals to prevent them stacking
function clearAllIntervals() {
  for (var i = 0; i < intervalIDs.length; i++) {
    clearInterval(intervalIDs[i]);
  }
  intervalIDs = [];
  
  // clear all timeouts using an empty function trick
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }

};

// Interval function to call media change function
function callMediaChange() {
  clearAllIntervals();
  intervalID = setInterval(changeMedia, 30000);
}

arrowLeft.addEventListener("click", function () {
  // Clear the interval to prevent multiple intervals running at once
  clearAllIntervals();

  // animate old picture to slide out from the frame
  $(allMedia[selectedMedia]).animate({ left: "100%" }, 250);

  // if to prevent going "under" the list of imgs
  if (selectedMedia == 0) {
    selectedMedia = allMedia.length - 1;
  } else {
    selectedMedia--;
  }

  // select previous media child element from mediacontainer
  // to check if its video or not
  const prevElement = allMedia[selectedMedia].children[0];

  if (prevElement.tagName === "VIDEO") {
    // get video duration and multiply to get amout of milliseconds
    let videoDuration = (prevElement.duration * 1000) - 800;
    // stop slideshow and reset video playback to beginning of video
    prevElement.pause();
    prevElement.currentTime = 0;
    prevElement.play();
    // timeout for the duration of the video
    setTimeout(function () {
      // reset interval to start over
      callMediaChange();
      // call for the media change function
      changeMedia();
    }, videoDuration);
  }

  // reset all positions to left to reset animation
  allMedia.forEach((media) => {
    media.style.left = "-100%";
  });

  // animate new picture to slide into the frame
  $(allMedia[selectedMedia]).animate({ left: "0%" }, 250);

  // reset interval to start over
  callMediaChange();
});

arrowRight.addEventListener("click", function () {
  // Clear the interval to prevent multiple intervals running at once
  clearAllIntervals();

  // animate old picture to slide out from the frame
  $(allMedia[selectedMedia]).animate({ left: "-100%" }, 250);

  // if to prevent going "over" the list of imgs
  if (selectedMedia == allMedia.length - 1) {
    selectedMedia = 0;
  } else {
    selectedMedia++;
  }

  // select next media child element from mediacontainer
  // to check if its video or not
  const nextElement = allMedia[selectedMedia].children[0];

  if (nextElement.tagName === "VIDEO") {
    // get video duration and multiply to get amout of milliseconds
    let videoDuration = (nextElement.duration * 1000) - 800;
    // stop slideshow and reset video playback to beginning of video
    nextElement.pause();
    nextElement.currentTime = 0;
    nextElement.play();
    // timeout for the duration of the video
    setTimeout(function () {
      // reset interval to start over
      callMediaChange();
      // call for the media change function
      changeMedia();
    }, videoDuration);
  }

  // reset all positions to right to reset animation
  allMedia.forEach((media) => {
    media.style.left = "100%";
  });

  // animate new picture to slide into the frame
  $(allMedia[selectedMedia]).animate({ left: "0%" }, 250);

  // reset interval to start over
  callMediaChange();
});



window.addEventListener("load", callMediaChange);

// disable text selection to prevent accidental "blue screen"
document.body.style.userSelect = "none";
