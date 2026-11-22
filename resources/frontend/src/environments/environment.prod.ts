// Production serves the SPA and the API from the same origin (nginx), so derive the URLs at runtime
// instead of hard-coding a hostname.
export const environment = {
    production: true,
    currentUrl: window.location.origin,
    backendServer: window.location.origin,
};
