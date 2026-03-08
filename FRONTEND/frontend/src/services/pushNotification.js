export async function subscribeUser() {

  if (!("serviceWorker" in navigator)) {
    console.log("Service worker not supported");
    return;
  }

  if (!("PushManager" in window)) {
    console.log("Push notifications not supported");
    return;
  }

  const publicKey =
    "BARpNhhpuyU1lh6ZMG3iWBccfS7upLNhwwH_FmZrFI0M-0XrQG-n8WU0rNVEIXqwlimoFJbV4yYMzYwvjnEoYFQ=";

  const registration = await navigator.serviceWorker.register("/sw.js");

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";
  await fetch(`${API_BASE_URL}/notifications/subscribe/`, {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("Push subscribed");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}