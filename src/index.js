import atributosMovies from "./atributosMovies";

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "d62e671e72a3270f6005a951e144404c";
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const movieListContainer = document.getElementById("movie-list");
  const paginationNumbers = document.getElementById("pagination-numbers");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  let currentPage = 1;
  const moviesPerPage = 9;
  let totalMovies = 0;
  let totalPages = 0;

  let selectedMovies = JSON.parse(localStorage.getItem("selectedMovies")) || [];
  // Array para la cola
  let selectedQueueMovies = JSON.parse(localStorage.getItem("selectedQueueMovies")) || [];

  async function fetchPopularMovies(page) {
    try {
      const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      movieListContainer.innerHTML = "";

      if (page === 1) {
        totalMovies = data.total_results;
        totalPages = Math.ceil(totalMovies / moviesPerPage);
      }

      const startIndex = (page - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;

      data.results.slice(startIndex, endIndex).forEach(async (movie) => {
        await atributosMovies(movie, API_URL, API_KEY, IMAGE_BASE_URL, movieListContainer);

        const btnAddWatched = document.getElementById("addToWatched");
        const btnAddQueue = document.getElementById("addToQueue");
        
        btnAddWatched.addEventListener("click", async () => {
          try {
            const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
            const genresData = await genresResponse.json();
            const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
            const selectedMovie = {
              title: movie.title,
              poster_path: IMAGE_BASE_URL + movie.poster_path,
              genres: genreNames,
              rating: movie.vote_average || "No disponible",
            };
            selectedMovies.push(selectedMovie);
            console.log("Película seleccionada:", selectedMovie);
            console.log("Películas seleccionadas:", selectedMovies);
            localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));
          } catch (error) {
            console.log("Error al obtener géneros:", error);
          }
        });

        btnAddQueue.addEventListener("click", async () => {
          try {
            const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
            const genresData = await genresResponse.json();
            const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
            const selectedQueueMovie = {
              title: movie.title,
              poster_path: IMAGE_BASE_URL + movie.poster_path,
              genres: genreNames,
              rating: movie.vote_average,
            };
            const existingQueueMovies = JSON.parse(localStorage.getItem("selectedQueueMovies")) || [];
            existingQueueMovies.push(selectedQueueMovie);
            console.log("Película seleccionada:", selectedQueueMovie);
            console.log("Películas seleccionadas:", existingQueueMovies);
            localStorage.setItem("selectedQueueMovies", JSON.stringify(existingQueueMovies));
          } catch (error) {
            console.log("Error al obtener géneros:", error);
          }
        });
      });

      // Actualizar la paginación
      paginationNumbers.innerHTML = "";
      const maxPages = Math.min(totalPages, 5);

      for (let i = 1; i <= maxPages; i++) {
        const button = document.createElement("button");
        button.classList.add("pagination-number");
        button.textContent = i;
        if (i === currentPage) {
          button.classList.add("active");
        }
        button.addEventListener("click", () => {
          currentPage = i;
          fetchPopularMovies(currentPage);
        });
        paginationNumbers.appendChild(button);
      }

      if (totalPages > 20) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        paginationNumbers.appendChild(dots);
      }

      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;

    } catch (error) {
      console.error("Error al obtener películas populares:", error);
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchPopularMovies(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchPopularMovies(currentPage);
    }
  });

  fetchPopularMovies(currentPage);
});

const btnMyLibrary = document.querySelector('.my-library-btn');
const containerLibrarySearch = document.querySelector('.search-container');

btnMyLibrary.addEventListener('click', event => {
  event.preventDefault();
  containerLibrarySearch.innerHTML = '';
  const watchedBtn = document.createElement('button');
  const queueBtn = document.createElement('button');
  watchedBtn.textContent = 'WATCHED';
  queueBtn.textContent = 'QUEUE';
  watchedBtn.classList.add("library-container__button--active");
  queueBtn.classList.add('library-container__button--transparent');
  containerLibrarySearch.classList.add('library-container__button');
  containerLibrarySearch.append(watchedBtn, queueBtn);
});

// BUSQUEDA DE PELÍCULAS POR NOMBRE

const searchInputBusqueda = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e) => {
  if (searchInputBusqueda.value === "") {
    e.preventDefault();
  } else {
    const searchTerm = searchInputBusqueda.value;
    searchMoviesByTitle(searchTerm);
  }
});

async function searchMoviesByTitle(searchTerm) {
  const API_KEY = "d62e671e72a3270f6005a951e144404c";
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const movieListContainer = document.getElementById("movie-list");

  try {
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&include_adult=false&language=en-US`
    );
    const data = await response.json();
    movieListContainer.innerHTML = "";

    data.results.forEach(async (movie) => {
      await atributosMovies(movie, API_URL, API_KEY, IMAGE_BASE_URL, movieListContainer);
    });
  } catch (error) {
    console.error("Error al buscar películas por título:", error);
  }
};
