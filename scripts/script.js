document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.getElementById('search-button');
    var searchBar = document.getElementById('search-bar');

    // Toggle the search bar when the search button is clicked
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (searchBar.style.display === 'none' || searchBar.style.display === '') {
            searchBar.style.display = 'block';
        } else {
            searchBar.style.display = 'none';
        }
    });
});
document.getElementById('searchBtn').addEventListener('click', function () {
    const searchPopup = document.getElementById('searchPopup');
    if (searchPopup.style.display === 'block') {
        searchPopup.style.display = 'none';
    } else {
        searchPopup.style.display = 'block';
    }
});

