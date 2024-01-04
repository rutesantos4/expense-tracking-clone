self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: '/static/apple-touch-icon.png',
      image: '/static/icon-192.png'
    };
    event.waitUntil(self.registration.showNotification('New Expense', options));
});