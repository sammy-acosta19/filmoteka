/*const apiKey = "d62e671e72a3270f6005a951e144404c"
function showMovieModal(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("movieTitle").textContent = data.title;
      document.getElementById("movieOverview").textContent = data.overview;
    });
  document.getElementById("movieModal").style.display = "block";
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("movieModal").style.display = "none";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.getElementById("movieModal").style.display = "none";
  }
});

window.addEventListener("click", (event) => {
  if (event.target === document.getElementById("movieModal")) {
    document.getElementById("movieModal").style.display = "none";
  }
});

document.getElementById("addToWatched").addEventListener("click", () => {
  const movieTitle = document.getElementById("movieTitle").textContent;
  let watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
  watchedMovies.push(movieTitle);
  localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  alert("Película añadida a Vistas.");
});

document.getElementById("addToQueue").addEventListener("click", () => {
  const movieTitle = document.getElementById("movieTitle").textContent;
  let queueMovies = JSON.parse(localStorage.getItem("queueMovies")) || [];
  queueMovies.push(movieTitle);
  localStorage.setItem("queueMovies", JSON.stringify(queueMovies));
  alert("Película añadida a la Cola.");
});

const movieElements = document.querySelectorAll('.movie-element');
movieElements.forEach((element) => {
  element.addEventListener('click', () => {
    const movieId = element.dataset.movieId;
    showMovieModal(movieId);
  });
});*///# sourceMappingURL=modalmovies.47967cf1.js.map

//# sourceMappingURL=modalmovies.47967cf1.js.map
