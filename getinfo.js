// getinfo.js
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to get a cookie by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    // Define the keys for the data we need, corresponding to cookie names and element IDs
    const dataFields = {
        handlerName: 'handlerName',
        petName: 'petName',
        endDate: 'endDate',
        petBreed: 'petBreed',
        petColor: 'petColor',
        petMicrochip: 'petMicrochip',
        startDate: 'startDate',
        licenceNumber: 'licenceNumber',
        handlerAddress: 'handlerAddress',
        handlerPhone: 'handlerPhone'
    };

    let retrievedData = {};
    let allCookiesFound = true;

    // Try to get data from cookies
    for (const key in dataFields) {
        const cookieValue = getCookie(key);
        if (cookieValue !== null) {
            retrievedData[key] = cookieValue;
        } else {
            allCookiesFound = false;
            // If any cookie is missing, we'll stop checking and use mock data for all fields.
            break;
        }
    }

    // If not all cookies were found, use mock data.
    // Crucially, we do not create any cookies here.
    if (!allCookiesFound) {
        retrievedData = {
            handlerName: "Alex Smith (Mock Data)",
            petName: "Rover (Mock Data)",
            endDate: "15/07/2026",
            petBreed: "German Shepherd (Mock Data)",
            petColor: "Black and Tan (Mock Data)",
            petMicrochip: "900123456789012 (Mock Data)",
            startDate: "15/07/2024",
            licenceNumber: "PAL-MOCK-67890",
            handlerAddress: "456 Example Avenue, Mocktown, MK 6789 (Mock Data)",
            handlerPhone: "1800 123 789 (Mock Data)"
        };
    }

    // Populate the HTML elements
    // The IDs in the HTML are like <span id="handlerName"></span>, etc.
    // The dataFields object maps our internal keys to these IDs if they were different,
    // but here they are the same.
    document.getElementById('handlerName').textContent = retrievedData.handlerName || 'N/A';
    document.getElementById('petName').textContent = retrievedData.petName || 'N/A';
    document.getElementById('endDate').textContent = retrievedData.endDate || 'N/A';
    document.getElementById('petBreed').textContent = retrievedData.petBreed || 'N/A';
    document.getElementById('petColor').textContent = retrievedData.petColor || 'N/A';
    document.getElementById('petMicrochip').textContent = retrievedData.petMicrochip || 'N/A';
    document.getElementById('startDate').textContent = retrievedData.startDate || 'N/A';
    document.getElementById('licenceNumber').textContent = retrievedData.licenceNumber || 'N/A';
    document.getElementById('handlerAddress').textContent = retrievedData.handlerAddress || 'N/A';
    document.getElementById('handlerPhone').textContent = retrievedData.handlerPhone || 'N/A';
});
