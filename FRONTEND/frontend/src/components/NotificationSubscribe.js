import React, { useMemo, useState } from "react";
import { getVapidPublicKey, subscribeNotifications } from "../services/api";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

const NotificationSubscribe = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [minLevel, setMinLevel] = useState("LOW");
  const [wantsEmail, setWantsEmail] = useState(true);
  const [wantsSms, setWantsSms] = useState(false);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const canPush = useMemo(() => {
    return (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window
    );
  }, []);

  const submit = async (payload) => {
    setBusy(true);
    setStatus(null);
    try {
      await subscribeNotifications(payload);
      setStatus({ type: "success", text: "Subscribed successfully." });
    } catch (e) {
      setStatus({ type: "error", text: e.message || "Subscription failed." });
    } finally {
      setBusy(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await submit({
      email: email || null,
      phone: phone || null,
      wants_email: wantsEmail,
      wants_sms: wantsSms,
      wants_push: false,
      min_level: minLevel,
    });
  };

  const enablePush = async () => {
    if (!canPush) {
      setStatus({ type: "error", text: "Push is not supported on this browser." });
      return;
    }

    setBusy(true);
    setStatus(null);
    try {
      const { publicKey } = await getVapidPublicKey();
      if (!publicKey) {
        setStatus({
          type: "error",
          text: "Push is not configured on the server (missing VAPID_PUBLIC_KEY).",
        });
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus({ type: "error", text: "Notification permission was not granted." });
        return;
      }

      const reg = await navigator.serviceWorker.register("/sw.js");
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await submit({
        email: email || null,
        phone: phone || null,
        wants_email: wantsEmail,
        wants_sms: wantsSms,
        wants_push: true,
        min_level: minLevel,
        push_subscription: sub.toJSON(),
      });
    } catch (e) {
      setStatus({ type: "error", text: e.message || "Push setup failed." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 py-14 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Get Notifications
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Subscribe to receive alerts by Email, SMS, or Push notifications.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (SMS)
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={wantsEmail}
                  onChange={(e) => setWantsEmail(e.target.checked)}
                />
                Email
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={wantsSms}
                  onChange={(e) => setWantsSms(e.target.checked)}
                />
                SMS
              </label>
              <div className="ml-auto">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Minimum level
                </label>
                <select
                  value={minLevel}
                  onChange={(e) => setMinLevel(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="LOW">Low (all alerts)</option>
                  <option value="MEDIUM">Medium + High</option>
                  <option value="HIGH">High only</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                disabled={busy}
                type="submit"
                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Subscribe
              </button>
              <button
                disabled={busy}
                type="button"
                onClick={enablePush}
                className="bg-gray-900 hover:bg-black disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Enable Push Notifications
              </button>
            </div>

            {status && (
              <div
                className={
                  status.type === "success"
                    ? "text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3"
                    : "text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3"
                }
              >
                {status.text}
              </div>
            )}
          </form>
        </div>

        <div className="bg-[#2C3E50] text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-3">How it works</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>• Admin reports a disaster</li>
            <li>• System generates an alert (LOW / MEDIUM / HIGH)</li>
            <li>• Subscribers receive Email / SMS / Push (based on preference)</li>
          </ul>
          <p className="text-xs text-gray-300 mt-4">
            Note: SMS and Push require server configuration (Twilio + VAPID keys).
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSubscribe;

