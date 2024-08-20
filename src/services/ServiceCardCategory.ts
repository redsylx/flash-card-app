import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}cardCategory`

async function serviceCardCategoryGetList (accessToken: string, accountId: string) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

async function serviceCardCategoryCreate (accessToken: string, accountId: string, categoryName: string) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}&name=${encodeURIComponent(categoryName)}`;
    const init = requestInit(accessToken, 'POST');
    return await fetch(url, init);
}

export {
    serviceCardCategoryGetList,
    serviceCardCategoryCreate
}