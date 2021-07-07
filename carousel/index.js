const backButton = document.querySelector('.back-button');
const forwardButton = document.querySelector('.forward-button');
const photoStrip = document.querySelector('.photo-strip');

const photoOptions = Array.prototype.slice.call(document.querySelectorAll(".image-option"));


let currentPosition = -670;
let currentPicture = 0;
let intervalId;

function goToImage(e) {

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = setInterval(moveForward, 5000);
  }

  photoOptions[currentPicture].classList.remove('selected');

  const picNumber = parseInt(e.target.getAttribute('data-pic'));
  currentPicture = picNumber;
  currentPosition = currentPicture * -670 - 670;

  photoStrip.style.transform = `translateX(${currentPosition}px)`;
  photoOptions[currentPicture].classList.add('selected');

  console.log(photoOptions[currentPicture]);
}

function moveBack() {

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = setInterval(moveForward, 5000);
  }

  photoOptions[currentPicture].classList.remove('selected');

  currentPosition += 670;
  currentPicture -= 1;
  if (currentPicture < 0) {
    currentPicture = 4;
  }
  photoOptions[currentPicture].classList.add('selected');

  forwardButton.disabled = true;
  backButton.disabled = true;
  photoStrip.style.transform = `translateX(${currentPosition}px)`;

  setTimeout(() => {
    if (currentPosition > -660) {
      currentPosition = -3350;
      photoStrip.style.transition = 'none';
      photoStrip.style.transform = `translateX(${currentPosition}px)`;
      setTimeout(() => {
        photoStrip.style.transition = 'transform .5s';
        forwardButton.disabled = false;
        backButton.disabled = false;
      }, 100);
    } else {
      forwardButton.disabled = false;
      backButton.disabled = false;
    }
  }, 600);

}

function moveForward() {

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = setInterval(moveForward, 5000);
  }

  photoOptions[currentPicture].classList.remove('selected');

  currentPosition -= 670;
  currentPicture += 1;
  if (currentPicture > 4) {
    currentPicture = 0;
  }
  photoOptions[currentPicture].classList.add('selected');

  forwardButton.disabled = true;
  backButton.disabled = true;
  photoStrip.style.transform = `translateX(${currentPosition}px)`;

  setTimeout(() => {
    if (currentPosition <= -4010) {
      currentPosition = -670;
      photoStrip.style.transition = 'none';
      photoStrip.style.transform = `translateX(-670px)`;
      setTimeout(() => {
        photoStrip.style.transition = 'transform .5s';
        forwardButton.disabled = false;
        backButton.disabled = false;
      }, 100);
    } else {
      forwardButton.disabled = false;
      backButton.disabled = false;
    }
  }, 600);

}

backButton.addEventListener('click', moveBack);
forwardButton.addEventListener('click', moveForward);

photoOptions.forEach((option) => {
  option.addEventListener('click', goToImage)
})

intervalId = setInterval(moveForward, 5000);