const track = document.getElementById("image-track");
const headerImage = document.querySelector(".header-image img");
let centeredImageClicked = false;
let isDragging = false;
let animationInProgress = false; // Flag to track if animation is in progress
let selectedImage = null; // Variable to track the currently selected image

// Initialize dataset values if not already set
if (!track.dataset.mouseDownAt) {
  track.dataset.mouseDownAt = "0";
}
if (!track.dataset.prevPercentage) {
  track.dataset.prevPercentage = "0";
}
if (!track.dataset.percentage) {
  track.dataset.percentage = "0";
}

const handleOnDown = (e) => {
  centeredImageClicked = false; // Reset centered image click flag on down
  isDragging = false; // Reset dragging flag
  console.log("Mouse/touch down event:", e.type);
  console.log("Client X:", e.clientX);
  console.log("Touches:", e.touches);

  // Ensure dataset values are updated correctly
  if (e.type === "mousedown") {
    track.dataset.mouseDownAt = e.clientX.toString();
  } else if (e.type === "touchstart") {
    track.dataset.mouseDownAt = e.touches[0].clientX.toString();
  }

  console.log("Updated mouseDownAt:", track.dataset.mouseDownAt);
  console.log("Previous percentage:", track.dataset.prevPercentage);
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0" || centeredImageClicked) return;

  isDragging = true; // Set dragging flag
  let clientX;
  if (e.type === "mousemove") {
    clientX = e.clientX;
  } else if (e.type === "touchmove") {
    clientX = e.touches[0].clientX;
  }

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
    maxDelta = track.clientWidth / 2; // Use track's width instead of window width

  const percentage = (mouseDelta / maxDelta) * -50,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 20), -80);

  track.dataset.percentage = nextPercentage;

  track.style.transform = `translateX(${nextPercentage}%)`;

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${80 + nextPercentage}% center`;
  }

  console.log("Mouse/touch move. Current percentage:", nextPercentage);
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
  console.log(
    "Mouse/touch up. New previous percentage:",
    track.dataset.prevPercentage
  );

  centeredImageClicked = false; // Reset centered image click flag
  isDragging = false; // Reset dragging flag
};

const handleImageClick = (e) => {
  if (isDragging || animationInProgress) return; // If dragging or animation in progress, do not process click

  const image = e.target; // Reference the clicked image
  const newBackgroundImage = image.src;

  animationInProgress = true; // Set animation in progress

  image.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.2)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 600, // Slow down the puff effect
      easing: "ease-in-out",
    }
  ).onfinish = () => {
    // Replace the background image of the header
    headerImage.src = newBackgroundImage;
    headerImage.style.backgroundSize = "cover";
    headerImage.style.backgroundRepeat = "no-repeat";

    animationInProgress = false; // Reset animation state
  };

  centeredImageClicked = true; // Set flag to avoid drag interference
};

// Event listeners limited to the image-track div
track.addEventListener("mousedown", handleOnDown);
track.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
track.addEventListener("mousemove", handleOnMove);
track.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", handleOnUp);

// Additional handling for image clicks within the track
for (const image of track.getElementsByClassName("image")) {
  image.addEventListener("click", handleImageClick);
}
