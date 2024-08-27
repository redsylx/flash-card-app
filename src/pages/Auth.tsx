import { ChangeEvent, useEffect, useState } from "react"
import { serviceAuthGet, serviceAuthUpdate} from "../services/ServiceAuth";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ROUTES } from "../routes";
import { getIdToken } from "../firebase";
import IAccount from "../interfaces/IAccount";
import { useAccount } from "../store";
import { useFetchUser } from "../hooks";

export default () => {
    const [username, setUsername] = useState("");
    const { account } = useAccount();
    const [isUsernameFilled, setUsernameFilled] = useState(false);

    useFetchUser(isUsernameFilled);

    useEffect(() => {
        if(account.username) navigate(ROUTES.HOME)
    }, [account])

    const authUpdate = async () => {
        const token = await getIdToken();
        if(await serviceAuthUpdate(token, username)) setUsernameFilled(true)
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

    const navigate = useNavigate();
    const [isUsernameExist, setUsernameExist] = useState(true);
    useEffect(() => {
        const getUser = async () => {
            const token = await getIdToken();
            const account = (await (await serviceAuthGet(token)).json()) as IAccount;
            setUsernameExist(account.username === "");
            if(account.username) setUsernameFilled(true);
        }

        getUser();
    },[])
    
    return(
        <div className="flex items-center min-h-screen custom-page">
            {isUsernameExist ? <p>Authenticating . . .</p> : 
            <div>
            <p className="custom-text-4 mb-4">umm . . .</p>
            <p className="custom-text-4 mb-8">what should we call you?</p>
            <div className="flex items-center" id="SSS">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => handleInputChange(e)}
                    maxLength={15}
                    placeholder="ucup_tampan1"
                    className="min-w-[500px] custom-text-4 h-12 bg-transparent text-sub placeholder-sub-alt focus:outline-none"
                />
                <button onClick={() => authUpdate()}>
                    <ArrowCircleRightIcon 
                            className={`w-16 h-16 transition-colors duration-300 ${isUsernameValid() ? 'text-[var(--sub-color)]' : 'text-[var(--sub-alt-color)]'}`} 
                            style={{fontSize: 64}}
                    />
                </button>
            </div>
        </div>
            }
        </div>
    )
}