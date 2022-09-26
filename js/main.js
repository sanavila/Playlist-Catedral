let audio = document.querySelector(".audios");
player.onclick = () => audio.play();
pause.onclick = () => audio.pause();
console.log("o som tem" + audio.duration + "segundos");

const element = (el) => document.querySelector(el);

tracksJson.map((item, index)=>{
    let MusicItems = document.querySelector('.flex-container .container').cloneNode(true);    
    element('.container img').src = item.img;
    element('h1').innerHTML = item.title; 
    element('p').innerHTML = item.author;
    element('.audios').src = item.audio;
}); 