document.addEventListener('DOMContentLoaded', function() {

    // Helper function to get a cookie by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const value = c.substring(nameEQ.length, c.length);
                // Return the raw value, decodeURIComponent will be used when displaying
                // If value is an empty string, it's still a valid cookie value.
                return value ? decodeURIComponent(value) : null; // Treat empty string as null for prompting logic
            }
        }
        return null; // Return null if cookie not found
    }

    // Helper function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        const cookieValue = value !== null && typeof value !== 'undefined' ? encodeURIComponent(value) : "";
        document.cookie = name + "=" + cookieValue + expires + "; path=/; SameSite=Lax";
    }

    // Cookie names (using a prefix for clarity)
    const cookieNames = {
        handlername: "pal_handlername",
        handleraddress: "pal_handleraddress",
        handlerphone: "pal_handlerphone",
        petname: "pal_petname",
        petbreed: "pal_petbreed",
        petcolor: "pal_petcolor",
        petmicrochip: "pal_petmicrochip",
        licencenumber: "pal_licencenumber",
        startdate: "pal_startdate",
        enddate: "pal_enddate"
    };

    // Days for cookie expiration
    const cookieExpiryDays = 30; // Cookies will last for 30 days

    // --- Get references to HTML elements ---
    const elements = {
        handlerName: document.getElementById('handlerName'),
        handlerAddress: document.getElementById('handlerAddress'),
        handlerPhone: document.getElementById('handlerPhone'),
        petName: document.getElementById('petName'),
        petBreed: document.getElementById('petBreed'),
        petColor: document.getElementById('petColor'),
        petMicrochip: document.getElementById('petMicrochip'),
        licenceNumber: document.getElementById('licenceNumber'),
        startDate: document.getElementById('startDate'),
        endDate: document.getElementById('endDate')
    };

    // --- Function to process each data field ---
    function processField(dataKey, element, promptMessage) {
        if (!element) {
            console.warn(`HTML element for ${dataKey} not found.`);
            return; // Skip if element not found in HTML
        }

        const cookieName = cookieNames[dataKey];
        let value = getCookie(cookieName);

        // If cookie doesn't exist or its value is null/empty after decoding
        if (value === null || value.trim() === "") {
            const userInput = prompt(promptMessage);

            if (userInput !== null) { // User clicked "OK"
                value = userInput.trim(); // Use user input, trim whitespace
                if (value === "") {
                    value = "N/A"; // Default if user enters nothing and clicks OK
                }
            } else { // User clicked "Cancel" or closed the prompt
                value = "N/A"; // Default if user cancels
            }
            setCookie(cookieName, value, cookieExpiryDays); // Set cookie with user input or "N/A"
        }
        element.textContent = value; // Display the value (from cookie or new input)
    }

    // --- Populate fields: Get from cookie or prompt user ---
    // Note: This will result in a series of prompts if cookies are not set.
    processField('handlername', elements.handlerName, "Please enter the Handler's Name:");
    processField('handleraddress', elements.handlerAddress, "Please enter the Handler's Address:");
    processField('handlerphone', elements.handlerPhone, "Please enter the Handler's Phone Number (e.g., 555-1234):");
    processField('petname', elements.petName, "Please enter the Pet's Name:");
    processField('petbreed', elements.petBreed, "Please enter the Pet's Breed:");
    processField('petcolor', elements.petColor, "Please enter the Pet's Color:");
    processField('petmicrochip', elements.dogMicrochip, "Please enter the Pet's Microchip Number:");
    processField('licencenumber', elements.licenceNumber, "Please enter the Licence Number:");
    processField('startdate', elements.startDate, "Please enter the Licence Start Date (e.g., YYYY-MM-DD):");
    processField('enddate', elements.endDate, "Please enter the Licence End Date (e.g., YYYY-MM-DD):");

});
