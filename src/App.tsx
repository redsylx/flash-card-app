import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "./routes";

let BtnLogin = () => {
  const { loginWithRedirect } = useAuth0();
  return(
    <button 
      onClick={() => loginWithRedirect()}
      className="bg-sub-alt py-6 min-w-[300px] font-bold text-2xl rounded-xl custom-button">Login</button>
  )
}

function App() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, []);

  return (
    <>
        <div className="flex items-center min-h-screen custom-page">
          <div>
            <p className="font-bold text-5xl text-main mb-4">memento</p>
            <p className="text-3xl italic mb-12">/məˈmen.toʊ/</p>
            <p className="text-3xl font-light text-text max-w-[750px] mb-16">an object that you keep to remember a person, place, or event</p>
            <BtnLogin/>
          </div>
        </div>
    </>
  )
}

export default App
