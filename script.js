if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js') // Path relative to the root
            .then(registration => {
                console.log('ServiceWorker: Registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.error('ServiceWorker: Registration failed: ', error);
            });
    });
} else {
    console.log('Service Worker not supported in this browser.');
}
