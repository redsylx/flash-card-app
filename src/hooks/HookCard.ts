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
        try {
            const accessToken = await getAccessTokenSilently(tokenOptions);
            const response : Response = await fetch(url_auth, requestInit(accessToken));
            return await response.text();
        } catch (e) {
            console.log(e);
        }
    }

    return run;
}

export default useCardAuth;

