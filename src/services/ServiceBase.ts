const serviceDomain = import.meta.env.VITE_CARD_SERVICE_URL;
const requestInit = (accessToken: string, method: string = 'get') : RequestInit => {
    const headers: HeadersInit = {
        Authorization: `Bearer ${accessToken}`,
    };

    if (['post', 'put'].includes(method.toLowerCase())) {
        headers['Content-Type'] = 'application/json';
    }

    return {
        headers: headers,
        method: method,
    };
}
export {
    serviceDomain,
    requestInit
}