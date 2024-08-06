import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "localhost:7001";
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `http://${domain}/`,
            scope: "read:current_user",
          },
        });
  
        const userDetailsByIdUrl = `http://${domain}/auth`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const res = await metadataResponse.json();
  
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  let accessToken = "";

  getAccessTokenSilently().then(p => console.log(p))

  return (
    isAuthenticated && user && (
      <div>
        <p>accessToken: {accessToken}</p>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton/>
      </div>
    )
  );
};

export default Profile;