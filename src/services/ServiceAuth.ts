import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}auth`

async function serviceAuthGet(accessToken: string) {
    const response : Response = await fetch(base_url, requestInit(accessToken));
    return response;
}

async function serviceAuthUpdate (accessToken: string, username: string) {
    const url = `${base_url}?username=${encodeURIComponent(username)}`;
    const init = requestInit(accessToken, 'PUT');
    return await fetch(url, init);
}

export {
    serviceAuthGet,
    serviceAuthUpdate,
};

