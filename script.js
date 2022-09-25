let audio = document.querySelector(".audios");
player.onclick = () => audio.play();
pause.onclick = () => audio.pause();
console.log("o som tem" + audio.duration + "segundos")