import { ICard } from "../components/ListMemento";
import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}card`

async function serviceCardGetList (accessToken: string, categoryId: string) {
    const url = `${base_url}/list?cardCategoryId=${encodeURIComponent(categoryId)}`;
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

export {
    serviceCardGetList,
    serviceCardCreate,
    serviceCardUpdate
}