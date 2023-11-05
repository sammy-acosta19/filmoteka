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

  async function fetchPopularMovies(page) {
    try {
      const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      movieListContainer.innerHTML = "";

      if (page === 1) {
        totalMovies = data.total_results;
        totalPages = Math.ceil(totalMovies / moviesPerPage);
      }

      const startIndex = page * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;

      data.results.slice(startIndex, endIndex).forEach(async (movie) => {
        const movieContainer = document.createElement("div");
        movieContainer.id = `movie-${movie.id}`;
        movieContainer.classList.add("movie");
        movieContainer.style.width = "430px";
        movieContainer.style.height = "305px";
        movieContainer.style.marginBottom = "350px";
        movieContainer.style.marginTop = "80px";
        movieContainer.style.marginLeft = "50px";

        const image = document.createElement("img");
        image.src = IMAGE_BASE_URL + movie.poster_path;
        image.alt = movie.title;
        image.style.borderRadius = "5px";

        const title = document.createElement("h2");
        title.textContent = movie.title;
        title.style.color = "black";
        title.style.fontFamily = "Roboto";
        title.style.fontWeight = "500px";
        title.style.fontSize = "15px";

        const divcontainerPreInfo = document.createElement("div");
        divcontainerPreInfo.style.display = "flex";

        const genre = document.createElement("p");
        const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
        const genresData = await genresResponse.json();
        const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
        genre.textContent = `${genreNames}     |`;
        genre.style.color = "rgba(255, 107, 1, 1)";
        genre.style.fontFamily = "Roboto";
        genre.style.fontWeight = "500px";
        genre.style.fontSize = "15px";

        const releaseYear = document.createElement("p");
        const releaseDate = new Date(movie.release_date);
        releaseYear.textContent = `${releaseDate.getFullYear()}`;
        releaseYear.style.color = "rgba(255, 107, 1, 1)";
        releaseYear.style.fontFamily = "Roboto";
        releaseYear.style.fontWeight = "500px";
        releaseYear.style.fontSize = "15px";
        releaseYear.style.marginLeft = "5px";
        releaseYear.style.marginRight = "5px";

        const containerRatingOrange = document.createElement("div");
        containerRatingOrange.style.backgroundColor = "rgba(255, 107, 1, 1)";
        containerRatingOrange.style.width = "36px";
        containerRatingOrange.style.height = "16px";
        containerRatingOrange.style.borderRadius = "5px";

        const rating = document.createElement("p");
        rating.textContent = `${movie.vote_average}`;
        rating.style.color = "white";
        rating.style.fontFamily = "Roboto";
        rating.style.fontWeight = "500px";
        rating.style.fontSize = "13px";
        rating.style.textAlign = "center";

        movieListContainer.appendChild(movieContainer);
        movieContainer.appendChild(image);
        movieContainer.appendChild(title);
        movieContainer.appendChild(divcontainerPreInfo);
        divcontainerPreInfo.appendChild(genre);
        divcontainerPreInfo.appendChild(releaseYear);
        divcontainerPreInfo.appendChild(containerRatingOrange);
        containerRatingOrange.appendChild(rating);

        const btnAbrirModal = movieContainer;
        const btnCerrarModal = document.getElementById("btn-close-modal");
        const modal = document.querySelector('#modal');

        btnAbrirModal.addEventListener('click', () => {
          modal.showModal();
          const agregarHtmlModal = document.getElementById("add-movies-modal");
          const movieId = movie.id;
          const movieDetailsUrl = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
        
          fetch(movieDetailsUrl)
            .then(response => response.json())
            .then(data => {

            });
        });
        
        btnCerrarModal.addEventListener('click', () => {
          modal.close();
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

      // Habilitar o deshabilitar botones de página anterior y siguiente
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
const conteinerLibrarySearch = document.querySelector('.search-container');

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


const config = {
headers: {
  'accept': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjJlNjcxZTcyYTMyNzBmNjAwNWE5NTFlMTQ0NDA0YyIsInN1YiI6IjY1MzliYWFkMDkxZTYyMDBhY2JjZmIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kl2esxdpMndC8Ncdl_j46puXA1C37-yIPMFWbeO-_d4' // Cambio aquí
}
};

let page = 20;

function moviesPopularies(){
fetch(`https://api.themoviedb.org/3/trending/all/day?page=${page}&language=en-US`, config)
.then(response => response.json())
.then(data => console.log(data));

}

/*let search = "batman";
page = 1;
fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, config) // Cambio aquí
.then(response => response.json())
.then(data => console.log(data.results.map(d => d.title + " " + d.release_date)));

let movieID = 2661;
fetch(`https://api.themoviedb.org/3/movie/${movieID}`, config)
.then(response => response.json())
.then(data => console.log(data));
*/
