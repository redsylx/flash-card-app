import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Header from "../components/Header";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div className="custom-page">Loading ...</div>;
  }

  return (
    isAuthenticated && user && (
      <div>
        <Header/>
        <div className="custom-page">
          <p>Home Page</p>
        </div>
      </div>
    )
  );
};

export default Profile;