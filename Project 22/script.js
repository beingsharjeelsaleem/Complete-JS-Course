let playlist = document.querySelector("#playlist");
let currentTime = document.querySelector("#currentTime");
let progress = document.querySelector("#progress");
let durationTime = document.querySelector("#duration");
let prevBtn = document.querySelector("#prevBtn");
let playBtn = document.querySelector("#playBtn");
let nextBtn = document.querySelector("#nextBtn");
let volume = document.querySelector("#volume");
let audio = document.querySelector("#audio");
let cover = document.querySelector("#cover");
let trackTitle = document.querySelector("#trackTitle");
let trackArtist = document.querySelector("#trackArtist");
let currentIndex = 0;
let isPlaying = 0;

function createPlaylist() {
  songsList.forEach((oneSong, index) => {
    const song = document.createElement("div");
    song.classList.add("song");
    song.dataset.index = index;

    const songTitle = document.createElement("div");
    songTitle.classList.add("song-title");
    songTitle.textContent = oneSong.title;

    const songMeta = document.createElement("div");
    songMeta.classList.add("song-meta");
    songMeta.textContent = "Click to load";

    playlist.appendChild(song);
    song.append(songTitle, songMeta);
  });
}

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "00:00";

  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);
  let mm = m < 10 ? "0" + m : m;
  let ss = s < 10 ? "0" + s : s;
  return `${mm}:${ss}`;
}

function loadSong(index) {
  let song = songsList[index];
  audio.src = song.src;
  cover.style.backgroundImage = `url(${song.cover})`;
  cover.style.backgroundSize = "cover";
  cover.style.backgroundPosition = "center center";
  trackTitle.textContent = song.title;
  trackArtist.textContent = song.artist;
}

function highlightActiveSong() {
  let allSongs = document.querySelectorAll(".song");
  allSongs.forEach((song) => song.classList.remove("active"));

  let activeSong = document.querySelector(`[data-index="${currentIndex}"]`);

  activeSong.classList.add("active");
}

function prevSong() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = songsList.length - 1;
  }
  loadSong(currentIndex);
  highlightActiveSong();
  playSong();
}

function nextSong() {
  currentIndex++;

  if (currentIndex >= songsList.length) {
    currentIndex = 0;
  }
  loadSong(currentIndex);
  highlightActiveSong();
  playSong();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "Pause";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "Play";
}

playBtn.addEventListener("click", () => {
  if (!audio.src) loadSong(currentIndex);
  if (isPlaying) pauseSong();
  else playSong();
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("loadedmetadata", () => {
  durationTime.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

createPlaylist();
loadSong(currentIndex);
highlightActiveSong();
