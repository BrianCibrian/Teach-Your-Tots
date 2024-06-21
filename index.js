document.addEventListener("readystatechange", (event) => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});
