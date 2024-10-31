self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("YOUR_PUBLIC_KEY")
    });

    const response = await saveSubscription(subscription);
    console.log(response);
});

self.addEventListener("push", (e) => {
    self.registration.showNotification("Wohoo!!", { body: e.data.text() });
});
