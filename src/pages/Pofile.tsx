import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import Header from "../components/Header";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user && (
      <div>
        <Header/>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton/>
      </div>
    )
  );
};

export default Profile;