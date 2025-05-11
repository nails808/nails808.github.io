document.addEventListener('DOMContentLoaded', function() {
    // Path to your settings.json file.
    // If settings.json, index.html, and script.js are all in the root of your GitHub Pages site,
    // this relative path is correct.
    const settingsFile = 'settings.json';

    fetch(settingsFile)
        .then(response => {
            if (!response.ok) {
                // Construct the full URL that was attempted for better debugging on GitHub Pages
                // response.url directly gives the final URL fetched.
                throw new Error(`Network response was not ok for ${response.url}: ${response.status} ${response.statusText}`);
            }
            return response.json(); // Parses the response body as JSON
        })
        .then(data => {
            // Access the data and update the HTML elements
            const handlerNameElement = document.getElementById('handlerName');
            const petNameElement = document.getElementById('petName');
            const petBreedElement = document.getElementById('petBreed');
            const petColorElement = document.getElementById('petColor');

            if (handlerNameElement) {
                handlerNameElement.textContent = data.handlername || 'N/A';
            }
            if (petNameElement) {
                petNameElement.textContent = data.petname || 'N/A';
            }
            if (petBreedElement) {
                petBreedElement.textContent = data.petbreed || 'N/A';
            }
            if (petColorElement) {
                petColorElement.textContent = data.petcolor || 'N/A';
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing settings.json:', error);
            // Optionally, display an error message to the user on the page
            const elementsToUpdate = ['handlerName', 'petName', 'petBreed', 'petColor'];
            elementsToUpdate.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = 'Error loading data. Check console.';
                }
            });
        });
});
