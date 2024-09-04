import ICard from "../interfaces/ICard";
import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}card`

async function serviceCardGetList (accessToken: string, categoryId: string, ...filters: string[]) {
    let url = `${base_url}/list?cardCategoryId=${encodeURIComponent(categoryId)}&${filters.join('&')}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

async function serviceCardGetListByAccount (accessToken: string, accountId: string, ...filters: string[]) {
    let url = `${base_url}/list/account?accountId=${encodeURIComponent(accountId)}&${filters.join('&')}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

async function serviceCardCreate(accessToken: string, card: ICard) {
    const url = `${base_url}`;
    const init = requestInit(accessToken, 'POST');
    init.body = JSON.stringify(card);
    return await fetch(url, init);
}

async function serviceCardUpdate(accessToken: string, card: ICard) {
    const url = `${base_url}`;
    const init = requestInit(accessToken, 'PUT');
    init.body = JSON.stringify(card);
    return await fetch(url, init);
}

async function serviceCardDelete(accessToken: string, cardId: string) {
    const url = `${base_url}?cardId=${cardId}`;
    const init = requestInit(accessToken, 'DELETE');
    return await fetch(url, init);
}

export {
    serviceCardGetList,
    serviceCardGetListByAccount,
    serviceCardCreate,
    serviceCardUpdate,
    serviceCardDelete
}