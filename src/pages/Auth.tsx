import { ChangeEvent, useEffect, useState } from "react"
import { useCardAuth, useCardAuthUpdate} from "../hooks/HookCard";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const UsernameRequest : React.FC = () => {
    const [username, setUsername] = useState("");
    const cardAuthUpdate = useCardAuthUpdate();
    const navigate = useNavigate();

    const authUpdate = () => {
        if(cardAuthUpdate(username)) navigate("/profile")
    }
    const isUsernameValid = () => {
        return username.length > 3;
    }
    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/ /g, "_");
        value = value.toLowerCase();
        const regex = /^[a-zA-Z0-9_]*$/;
        if (regex.test(value)) {
            setUsername(value);
        }
    };

    return(
        <div>
            <p className="text-4xl mb-4">umm . . .</p>
            <p className="text-4xl mb-8">what should we call you?</p>
            <div className="flex items-center" id="SSS">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => handleInputChange(e)}
                    maxLength={15}
                    placeholder="ucup_tampan1"
                    className="min-w-[500px] text-4xl h-12 bg-transparent text-sub placeholder-sub-alt focus:outline-none"
                />
                <button onClick={() => authUpdate()}>
                    <ArrowCircleRightIcon 
                            className={`w-16 h-16 transition-colors duration-300 ${isUsernameValid() ? 'text-[var(--sub-color)]' : 'text-[var(--sub-alt-color)]'}`} 
                            style={{fontSize: 64}}
                    />
                </button>
            </div>
        </div>
    )
}

export default () => {
    const cardAuth = useCardAuth();
    const navigate = useNavigate();
    const [isUsernameExist, setUsernameExist] = useState(true);

    useEffect(() => {
        const authenticate = async () => {
            try {
                const { username } = await cardAuth();
                if(username) navigate("/profile");
                setUsernameExist(false);
            } catch (error) {
                navigate('/');
            }
        };

        authenticate();
    }, []);
    return(
        <div className="flex items-center min-h-screen">
            {isUsernameExist ? <p>Authenticating . . .</p> : <UsernameRequest/>}
        </div>
    )
}