document.addEventListener('DOMContentLoaded', function() {
    // Path to your settings.json file
    // If script.js is in the same root folder as settings.json and index.html:
    const settingsFile = 'dummy.json';
    // If settings.json is at the absolute root of your site and your script might be elsewhere:
    // const settingsFile = '/settings.json';

    fetch(settingsFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
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
                    el.textContent = 'Error loading data';
                }
            });
        });
});
