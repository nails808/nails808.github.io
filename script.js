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

function pad2(n) {
    return String(n).padStart(2, '0');
}

function updateVerticalDateTime() {
    const dateEl = document.getElementById('currentDate');
    const timeEl = document.getElementById('currentTime');
    if (!dateEl || !timeEl) return;

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mon = months[now.getMonth()];
    const dd = pad2(now.getDate());
    const yyyy = now.getFullYear();

    dateEl.textContent = `${mon} ${dd}, ${yyyy}`;
    timeEl.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
}

updateVerticalDateTime();
setInterval(updateVerticalDateTime, 1000);
