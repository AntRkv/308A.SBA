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
