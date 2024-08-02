import auth from "../services/auth";

export default function Authenticate() {
    auth.parseHash({ hash: window.location.hash }, function(err, authResult) {
        if (err) {
            return console.log(err);
        }
                
        if (authResult && authResult.accessToken) {
            console.log(authResult.accessToken);
            auth.client.userInfo(authResult.accessToken, (err, user) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(user);
            });
        }
    });

    return (
        <div>
            <h1>Authenticate</h1>
            <p>
                This is the authentication page. You can use this page to authenticate with the application.
            </p>
        </div>
    );
}