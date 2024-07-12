const API_KEY = 'qE7egZuoXBpluAECTOXLULQzer4oLszpf7fzW1cUuOE'; // Replace with your Unsplash API key
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const showMoreButton = document.getElementById('show-more-button');

let query = '';
let page = 1;

// Function to fetch images from Unsplash API
async function fetchImages() {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

// Function to display images
function displayImages(images) {
    images.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('search-result');
        imageElement.innerHTML = `
            <img src="${image.urls.small}" alt="${image.alt_description}">
            <a href="${image.links.html}" target="_blank">${image.alt_description}</a>
        `;
        searchResults.appendChild(imageElement);
    });
}

// Event listener for search form
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    query = searchInput.value;
    page = 1;
    searchResults.innerHTML = ''; // Clear previous results
    const images = await fetchImages();
    displayImages(images);
    showMoreButton.style.display = 'block';
});

// Event listener for show more button
showMoreButton.addEventListener('click', async () => {
    page++;
    const images = await fetchImages();
    displayImages(images);
});
