import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";

const serviceDomain = import.meta.env.VITE_CARD_SERVICE_URL;
const url_auth = `${serviceDomain}auth`;
const tokenOptions : GetTokenSilentlyOptions = {
    authorizationParams: {
        audience: serviceDomain,
    }
}
const requestInit = (accessToken: string) : RequestInit => {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
}

function useCardAuth() : Function {
    const { getAccessTokenSilently } = useAuth0();
    async function run() {
        const accessToken = await getAccessTokenSilently(tokenOptions);
        const response : Response = await fetch(url_auth, requestInit(accessToken));
        return await response.json();
    }
    return run;
}

function useCardAuthUpdate(): Function {
    const { getAccessTokenSilently } = useAuth0();
    
    async function run(username: string) {
        const accessToken = await getAccessTokenSilently(tokenOptions);
        const url = `${url_auth}?username=${encodeURIComponent(username)}`;
        const init = requestInit(accessToken);
        init.method = 'PUT';
        const response: Response = await fetch(url, init);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        return true;
    }

    return run;
}

export {
    useCardAuth,
    useCardAuthUpdate,
};

