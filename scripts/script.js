document.getElementById("search-button").addEventListener("click", () => {
  const genre = document.getElementById("genre").value;
  const rating = parseInt(document.getElementById("rating").value, 10);
  const year = parseInt(document.getElementById("year").value, 10);
  const currentYear = new Date().getFullYear();

  if (rating && (rating < 1 || rating > 10)) {
    alert("Please enter a rating between 1 and 10.");
    return;
  }

  if (year && (year < 1900 || year > currentYear)) {
    alert(`Please enter a release year between 1900 and ${currentYear}.`);
    return;
  }
  searchMovies(genre, rating, year);
});

const API_KEY = "d0f0a88e5d4450771129a6bce0fc6930";
const BASE_URL = "https://api.themoviedb.org/3";

async function loadGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    const genreSelect = document.getElementById("genre");
    data.genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading genres:", error);
  }
}
document.addEventListener("DOMContentLoaded", loadGenres);

async function searchMovies(genre, rating, year) {
  try {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    if (rating) {
      url += `&vote_average.gte=${rating}`;
    }

    if (year) {
      url += `&primary_release_year=${year}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

let currentMovieIndex = 0;

function displayMovies(movies) {
  const moviesList = document.getElementById("movies-list");
  moviesList.innerHTML = "";

  if (movies.length === 0) {
    moviesList.innerHTML = `<p>No movies found for the selected criteria.</p>`;
    return;
  }

  displayMovie(movies[currentMovieIndex], movies);
}

function displayMovie(movie, movies) {
  const moviesList = document.getElementById("movies-list");
  moviesList.innerHTML = "";

  const backgroundContainer = document.getElementById("background-container");
  backgroundContainer.style.opacity = "0.3";

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");
  movieElement.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" alt="${
    movie.title
  }">
    <h3>${movie.title} (${
    movie.release_date ? movie.release_date.split("-")[0] : "Unknown"
  })</h3>
    <p>Rating: ${movie.vote_average}</p>
    <div class="movie-buttons">
      <button class="interested-button">Interested</button>
      <button class="not-interested-button">Not Interested</button>
    </div>
  `;
  moviesList.appendChild(movieElement);

  const interestedButton = document.querySelector(".interested-button");
  const notInterestedButton = document.querySelector(".not-interested-button");

  interestedButton.addEventListener("click", () => {
    window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank");
    saveForLater(movie);

    currentMovieIndex = (currentMovieIndex + 1) % movies.length;
    displayMovie(movies[currentMovieIndex], movies);
  });

  notInterestedButton.addEventListener("click", () => {
    currentMovieIndex = (currentMovieIndex + 1) % movies.length;
    displayMovie(movies[currentMovieIndex], movies);
  });
}
