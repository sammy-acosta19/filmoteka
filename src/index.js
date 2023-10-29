document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "d62e671e72a3270f6005a951e144404c"; // Reemplaza con tu clave de API de TMDb
    const API_URL = "https://api.themoviedb.org/3";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
    // Elemento donde se mostrarán las películas
    const movieListContainer = document.getElementById("movie-list");
  
    // Función para obtener películas populares
    async function fetchPopularMovies() {
      try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
  
        // Mostrar las películas populares
        data.results.forEach(async (movie) => {
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
      } catch (error) {
        console.error("Error al obtener películas populares:", error);
      }
    }
  
    // Llama a la función para obtener películas populares
    fetchPopularMovies();
  });
  
  