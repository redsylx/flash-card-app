import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}card`

async function serviceCardGetList (accessToken: string, categoryId: string) {
    const url = `${base_url}/list?cardCategoryId=${encodeURIComponent(categoryId)}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

export {
    serviceCardGetList,
}