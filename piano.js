let mouseDown = false;
function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  event.target.classList.remove("pressed");
}

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  if (!audio) return;
  key.classList.toggle("pressed");
  audio.currentTime = 0;
  audio.play();
}

window.addEventListener("keydown", playSound);

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

keys.forEach((key) =>
  key.addEventListener("mousedown", (event) => {
    const note = event.target.dataset.key;
    const audio = document.querySelector(`audio[data-key="${note}"]`);
    key.classList.toggle("pressed");
    audio.currentTime = 0;
    audio.play();
    mouseDown = true;
  })
);

window.addEventListener("mouseup", (event) => {
  mouseDown = false;
});

keys.forEach((key) =>
  key.addEventListener("mouseover", (event) => {
    console.log(event);
    if (mouseDown) {
      const note = event.target.dataset.key;
      const audio = document.querySelector(`audio[data-key="${note}"]`);
      key.classList.toggle("pressed");
      audio.currentTime = 0;
      audio.play();
    } else return;
  })
);
