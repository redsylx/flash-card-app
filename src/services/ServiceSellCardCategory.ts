import { ISellCardCategory } from "../interfaces/ISellCardCategory";
import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}sellCardCategory`

async function serviceSellCardCategoryCreate (accessToken: string, accountId: string, cardCategoryId: string, dto: ISellCardCategory) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}&cardCategoryId=${encodeURIComponent(cardCategoryId)}`;
    const init = requestInit(accessToken, 'POST');
    init.body = JSON.stringify(dto);
    return await fetch(url, init);
}

async function serviceSellCardCategoryGetList (accessToken: string, accountId: string, ...filters: string[]) {
    let url = `${base_url}/list/account?accountId=${encodeURIComponent(accountId)}&${filters.join('&')}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

export {
    serviceSellCardCategoryCreate,
    serviceSellCardCategoryGetList
}