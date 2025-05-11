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
                return value ? decodeURIComponent(value) : null; // Return null if value is empty string after decoding
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
        // Ensure value is not null or undefined before encoding
        const cookieValue = value !== null && typeof value !== 'undefined' ? encodeURIComponent(value) : "";
        document.cookie = name + "=" + cookieValue + expires + "; path=/; SameSite=Lax";
        // Added SameSite=Lax for good practice
    }

    // Define mock data for when cookies are not found
    const mockData = {
        handlername: "Mock Handler Name (from Cookie)",
        handleraddress: "123 Cookie Lane, Faketown, FS 00000",
        handlerphone: "555-MOCK (555-0000)",
        petname: "Byte (Cookie Edition)",
        petbreed: "Cyber Spaniel",
        petcolor: "Digital Camo",
        petmicrochip: "MOCK000111222333C",
        licencenumber: "PAL-MOCK-COOKIE",
        startdate: "2025-01-01",
        enddate: "2026-01-01"
    };

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
    const cookieExpiryDays = 30;

    // --- Get references to HTML elements ---
    const elements = {
        handlerName: document.getElementById('handlerName'),
        handlerAddress: document.getElementById('handlerAddress'),
        handlerPhone: document.getElementById('handlerPhone'),
        petName: document.getElementById('petName'),
        petBreed: document.getElementById('petBreed'),
        petColor: document.getElementById('petColor'),
        petMicrochip: document.getElementById('petMicrochip'), // Ensure this ID is in your HTML span
        licenceNumber: document.getElementById('licenceNumber'),
        startDate: document.getElementById('startDate'),
        endDate: document.getElementById('endDate')
    };

    // --- Function to process each data field ---
    function processField(dataKey, element) {
        if (!element) return; // Skip if element not found

        const cookieName = cookieNames[dataKey];
        let value = getCookie(cookieName);

        if (value === null) { // If cookie doesn't exist or was empty
            value = mockData[dataKey];
            setCookie(cookieName, value, cookieExpiryDays);
        }
        element.textContent = value;
    }

    // --- Populate fields ---
    processField('handlername', elements.handlerName);
    processField('handleraddress', elements.handlerAddress);
    processField('handlerphone', elements.handlerPhone);
    processField('petname', elements.petName);
    processField('petbreed', elements.petBreed);
    processField('petcolor', elements.petColor);
    processField('petmicrochip', elements.petMicrochip);
    processField('licencenumber', elements.licenceNumber);
    processField('startdate', elements.startDate);
    processField('enddate', elements.endDate);

});
