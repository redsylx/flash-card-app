import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export default () => {
  const navigate = useNavigate();
  const login = () => {
    navigate(ROUTES.LOGIN)
  }
  return (
    <div className="flex items-center min-h-screen custom-page">
      <div>
        <p className="font-bold custom-text-5 text-main mb-4">memento</p>
        <p className="custom-text-3 italic mb-12">/məˈmen.toʊ/</p>
        <p className="custom-text-3 font-light text-text max-w-[750px] mb-16">an object that you keep to remember a person, place, or event</p>
        <button onClick={login} className="bg-sub-alt py-6 min-w-[300px] font-bold custom-text-2 rounded-xl custom-button">Login</button>
      </div>
    </div>
  )
}