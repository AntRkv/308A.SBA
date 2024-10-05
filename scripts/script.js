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
