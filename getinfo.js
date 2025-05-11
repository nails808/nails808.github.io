document.addEventListener('DOMContentLoaded', function() {
    // Path to your settings.json file.
    // If settings.json, index.html, and script.js are all in the root of your GitHub Pages site,
    // this relative path is correct.
    const settingsFile = 'dummy.json';

    fetch(settingsFile)
        .then(response => {
            if (!response.ok) {
                // response.url directly gives the final URL fetched.
                throw new Error(`Network response was not ok for ${response.url}: ${response.status} ${response.statusText}`);
            }
            return response.json(); // Parses the response body as JSON
        })
        .then(data => {
            // Access the data and update the HTML elements

            // Handler Info
            const handlerNameElement = document.getElementById('handlerName');
            const handlerAddressElement = document.getElementById('handlerAddress');
            const handlerPhoneElement = document.getElementById('handlerPhone');

            // Pet Info
            const petNameElement = document.getElementById('petName');
            const petBreedElement = document.getElementById('petBreed');
            const petColorElement = document.getElementById('petColor');
            const dogMicrochipElement = document.getElementById('petMicrochip');

            // Licence Info
            const licenceNumberElement = document.getElementById('licenceNumber');
            const startDateElement = document.getElementById('startDate');
            const endDateElement = document.getElementById('endDate');

            // Update Handler Info
            if (handlerNameElement) {
                handlerNameElement.textContent = data.handlername || 'N/A';
            }
            if (handlerAddressElement) {
                handlerAddressElement.textContent = data.handleraddress || 'N/A';
            }
            if (handlerPhoneElement) {
                handlerPhoneElement.textContent = data.handlerphone || 'N/A';
            }

            // Update Pet Info
            if (petNameElement) {
                petNameElement.textContent = data.petname || 'N/A';
            }
            if (petBreedElement) {
                petBreedElement.textContent = data.petbreed || 'N/A';
            }
            if (petColorElement) {
                petColorElement.textContent = data.petcolor || 'N/A';
            }
            if (petMicrochipElement) {
                petMicrochipElement.textContent = data.petmicrochip || 'N/A';
            }

            // Update Licence Info
            if (licenceNumberElement) {
                licenceNumberElement.textContent = data.licencenumber || 'N/A';
            }
            if (startDateElement) {
                startDateElement.textContent = data.startdate || 'N/A';
            }
            if (endDateElement) {
                endDateElement.textContent = data.enddate || 'N/A';
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing settings.json:', error);
            // Optionally, display an error message to the user on the page
            const idsToUpdateOnError = [
                'handlerName', 'handlerAddress', 'handlerPhone',
                'petName', 'petBreed', 'petColor', 'petMicrochip',
                'licenceNumber', 'startDate', 'endDate'
            ];
            idsToUpdateOnError.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = 'Error loading data. Check console.';
                }
            });
        });
});
