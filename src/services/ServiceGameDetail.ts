import { IGameDetail } from "../interfaces/IGameDetail";
import { requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}gamedetail`

async function serviceGameDetailGetAll (accessToken: string, gameId: string) {
    let url = `${base_url}/list?isPaged=false&gameId=${encodeURIComponent(gameId)}`;
    const init = requestInit(accessToken);
    return await fetch(url, init);
}

async function serviceGameDetailAnswer(accessToken: string, dto: IGameDetail) {
    let url = `${base_url}`;
    const init = requestInit(accessToken, 'put');
    init.body = JSON.stringify(dto);
    return await fetch(url, init);
}

export {
  serviceGameDetailGetAll,
  serviceGameDetailAnswer,
}