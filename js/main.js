const audio = document.querySelector(".audios");

let actual_music = 0;

back.onclick = () => {
    if (actual_music) {
        actual_music -= 1;
        loadMusic(tracksJson[actual_music])
        track.play();
    }
};
pause.onclick = () => audio.pause();
track.ontimeupdate = (event)  => {
    timeline.value = event.target.currentTime;
}
timeline.onchange = (event) => {
    track.currentTime = event.target.value;
}
player.onclick = () => audio.play();
repeat.onclick = () => {
    track.loop = !track.loop;
    if (track.loop) 
        repeat.classList.add("active");
    else
        repeat.classList.remove("active");
}
next.onclick = () => {
    if (actual_music < tracksJson.length -1) {
        actual_music += 1;
        loadMusic(tracksJson[actual_music])
        track.play();
    }
};
const loadMusic = item => { 
    image.src = item.img;
    image.alt = item.alt;
    title.innerHTML = item.title; 
    author.innerHTML = item.author;
    track.src = item.audio;
    image.addEventListener("load", (event) => {
        document.body.style.background = `linear-gradient(to bottom, ${averageColor(event.target, item.colorCount || 3, item.colorType || "mediana").join(", ")})`
    })
    audio.addEventListener("loadedmetadata", (event) => {
        timeline.max = event.target.duration 
    })

}; 

loadMusic(tracksJson[actual_music]);
 