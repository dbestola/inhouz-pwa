export const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!");
    }
    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }
    if (!('PushManager' in window)) {
        throw new Error("No support for Push API");
    }
};

export const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('/sw.js');
    return registration;
};

export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error("Notification permission not granted");
    }
};

export const saveSubscription = async (subscription) => {
    const response = await fetch('http://localhost:3000/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription),
    });
    return response.json();
};

export const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
