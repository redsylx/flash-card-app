const serviceDomain = import.meta.env.VITE_CARD_SERVICE_URL;
const requestInit = (accessToken: string, method: string = 'get') : RequestInit => {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: method,
    }
}
export {
    serviceDomain,
    requestInit
}