import { ISellCardCategory } from "../interfaces/ISellCardCategory";
import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}sellCardCategory`

async function serviceSellCardCategoryCreate (accessToken: string, accountId: string, cardCategoryId: string, dto: ISellCardCategory) {
    const url = `${base_url}?accountId=${encodeURIComponent(accountId)}&cardCategoryId=${encodeURIComponent(cardCategoryId)}`;
    const init = requestInit(accessToken, 'POST');
    init.body = JSON.stringify(dto);
    return await fetch(url, init);
}

export {
    serviceSellCardCategoryCreate,
}