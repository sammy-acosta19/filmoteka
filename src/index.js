
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const API_URL = "https://api.themoviedb.org/3";
    const API_KEY = "d62e671e72a3270f6005a951e144404c";
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
    const URL_IMAGE = "https://image.tmdb.org/t/p/original";

    // VARIABLES
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState({ title: "Loading Movies" });
    const [playing, setPlaying] = useState(false);

    // Peticion Get Api
    const fetchMovies = async (searchKey) => {
        const type = searchKey ? "search" : "discover";
        const response = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: API_KEY,
                query: searchKey,
            },
        });

        setMovies(response.data.results);
    };

    // Buscar películas
    useEffect(() => {
        const searchMovies = (e) => {
            e.preventDefault();
            fetchMovies(searchKey);
        };
        fetchMovies();
    }, []);

    function mapContainerMovies() {
        return (
            <div className="container movies3">
                <div className="row">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-3">
                            <img src={`${URL_IMAGE}${movie.poster_path}`} alt="" height={600} width="100%" />
                            <h4 className="text-center">{movie.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            {mapContainerMovies()}
        </div>
    );
}

export default App;
