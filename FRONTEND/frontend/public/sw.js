/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "New Alert", body: event.data ? event.data.text() : "" };
  }

  const title = data.title || "Disaster Alert";
  const options = {
    body: data.body || "A new alert is available.",
    icon: "/images/footer-logo.png",
    badge: "/images/footer-logo.png",
    data,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/alerts"));
});

