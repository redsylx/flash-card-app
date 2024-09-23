import { customFetch, requestInit, serviceDomain } from "./ServiceBase";

const base_url = `${serviceDomain}upload`

interface IGetUploadProp {
    uploadUrl: string;
    fileName: string;
    maxSize: number;
}

async function serviceUploadGetUploadImageUrl (accessToken: string, fileName: string) {
    const url = `${base_url}/image?fileName=${encodeURIComponent(fileName)}`;
    const init = requestInit(accessToken);
    return await customFetch(url, init);
}

async function serviceUpload(file: File, uploadProp: IGetUploadProp) {
    const uploadUrl = uploadProp.uploadUrl;
    const init: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
            'x-ms-blob-type': "BlockBlob"
        },
        body: file,
    };
    return await customFetch(uploadUrl, init);
}

export {
    serviceUploadGetUploadImageUrl,
    serviceUpload
}

export type {
    IGetUploadProp
}