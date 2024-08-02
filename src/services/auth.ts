import { AuthOptions, WebAuth } from "auth0-js";

const option : AuthOptions = {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientID: import.meta.env.VITE_AUTH_CLIENT_ID,
    scope: import.meta.env.VITE_AUTH_SCOPE
}

const auth = new WebAuth(option);

export default auth;