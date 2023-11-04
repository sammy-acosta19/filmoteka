document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "d62e671e72a3270f6005a951e144404c"; // Reemplaza con tu clave de API de TMDb
    const API_URL = "https://api.themoviedb.org/3";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
    // Elemento donde se mostrarán las películas
    const movieListContainer = document.getElementById("movie-list");
    const paginationNumbers = document.getElementById("pagination-numbers");
    let currentPage = 1;

    const moviesPerPage = 9;
  
    // Función para obtener películas populares
    async function fetchPopularMovies(page) {
      try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        movieListContainer.innerHTML = "";

        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
  
        // Mostrar las películas populares
        data.results.slice(startIndex, endIndex).forEach(async (movie) => {
          const movieContainer = document.createElement("div");
          movieContainer.classList.add("movie");
  
          const image = document.createElement("img");
          image.src = IMAGE_BASE_URL + movie.poster_path;
          image.alt = movie.title;
  
          const title = document.createElement("h2");
          title.textContent = movie.title;
  
          const genre = document.createElement("p");
          const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
          const genresData = await genresResponse.json();
          const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
          genre.textContent = `${genreNames}`;
  
          movieContainer.appendChild(image);
          movieContainer.appendChild(title);
          movieContainer.appendChild(genre);
          movieListContainer.appendChild(movieContainer);
        });

        paginationNumbers.innerHTML = "";
        const totalPages = Math.ceil(data.results.length / moviesPerPage);
        const maxPages = Math.min(totalPages, 20);
  
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
      } catch (error) {
        console.error("Error al obtener películas populares:", error);
      }
    }
  
    // Llama a la función para obtener películas populares
    fetchPopularMovies(currentPage);

    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchPopularMovies(currentPage);
      }
    });

    nextButton.addEventListener("click", () => {
      currentPage++;
      fetchPopularMovies(currentPage);
    });
  });
  



// Boton my library 
const btnMyLibrary = document.querySelector('.my-library-btn');
const conteinerLibrarySearch = document.querySelector(
  '.search-container'
);

btnMyLibrary.addEventListener('click', event => {
    event.preventDefault();
    conteinerLibrarySearch.innerHTML = '';
    const wachedBtn = document.createElement('button');
    const queveBtn = document.createElement('button');
    wachedBtn.textContent = 'WATCHED';
    queveBtn.textContent = 'QUEVE';
    wachedBtn.classList.add("library-container__button--active");
    queveBtn.classList.add('library-container__button--transparent');
    conteinerLibrarySearch.classList.add('library-container__button')
    conteinerLibrarySearch.append(wachedBtn, queveBtn);
});



