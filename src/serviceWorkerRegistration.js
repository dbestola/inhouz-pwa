

const isLocalhost = Boolean(
  typeof window !== 'undefined' && 
  window.location.hostname === 'localhost'
);


export function register(config) {
  if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {

      return;
    }

    return new Promise((resolve, reject) => {
      window.addEventListener('load', () => {
        const swUrl = `/service-worker.js`;

       
        navigator.serviceWorker.register(swUrl)
          .then((registration) => {
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker == null) {
                return;
              }
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    if (config && config.onUpdate) {
                      config.onUpdate(registration);
                    }
                  } else {
                    if (config && config.onSuccess) {
                      config.onSuccess(registration);
                    }
                  }
                }
              };
            };
            resolve(registration); // Ensure successful registration is resolved
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
            reject(error); // Reject if there's an error
          });
      });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
