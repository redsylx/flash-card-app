import React, { ChangeEvent, useState } from "react";
import LoginCard from "../components/LoginCard";
import { IconContainer } from "../components/IconContainer";
import { Google } from "@mui/icons-material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { useLoading } from "../components/Loading";
import { useAlert } from "../store";


interface LoginPageProps {
    setFormType: React.Dispatch<React.SetStateAction<LoginFormType>>
}

enum LoginFormType {
    signin = 'signin',
    signup = 'signup'
}

interface ILoginForm {
    email: string,
    password: string,
    repassword?: string
}

const RegisterForm : React.FC<LoginPageProps> = ({setFormType}) => {
    const [ loginForm, setLoginForm ] = useState<ILoginForm>({email: "", password: "", repassword: ""})
    const navigate = useNavigate();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        })
    }

    const loading = useLoading();
    const alert = useAlert();

    const register = () => {
        loading.setLoading(true)
        createUserWithEmailAndPassword(auth, loginForm.email, loginForm.password)
        .then(() => navigate(ROUTES.AUTH))
        .catch((error: any) => {
            alert.setTitle("Error")
            alert.setMessage(error.message)
            alert.setShow(true)
        });
        loading.setLoading(false)
    }   

    return(
        <div className="flex flex-col">
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                className="custom-input mb-4 p-2"
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="custom-input mb-4 p-2"
            />
            <input
                type="password"
                placeholder="RePassword"
                name="repassword"
                value={loginForm.repassword}
                onChange={handleInputChange}
                className="custom-input mb-4 p-2"
            />
            
            <button
                className="custom-button py-2 rounded-xl"
                onClick={register}
            >
                Register
            </button>

            <small className="mt-4 text-center text-sub">
                Sudah punya akun? <a onClick={() => setFormType(LoginFormType.signin)} className="text-sub underline hover:text-text"><i>login</i></a>
            </small>
        </div>
    )
}

const LoginForm : React.FC<LoginPageProps> = ({ setFormType }) => {
    const [loginForm, setLoginForm] = useState<ILoginForm>({email:"", password:""});
    const navigate = useNavigate();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        })
    }
    const loading = useLoading();
    const alert = useAlert();
    
    const login = () => {
        loading.setLoading(true)
        setPersistence(auth, browserSessionPersistence)
        .then(async () => {
            try {
                await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
                return navigate(ROUTES.AUTH);
            } catch (error: any) {
                alert.setTitle("Error");
                alert.setMessage(error.message);
                alert.setShow(true);
            };
        })
        .catch((error) => {
            console.error("Persistence error:", error);
        });
        loading.setLoading(false)
    }

    return (
        <div className="flex flex-col">
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                className="custom-input mb-4 p-2"
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="custom-input mb-2 p-2"
            />

            <small className="text-left mb-4">
                <a className="text-sub hover:text-text underline"><i>Lupa Password</i></a>
            </small>
            
            <button
                className="custom-button py-2 rounded-xl"
                onClick={login}
            >
                Log in
            </button>

            <small className="mt-4 text-center text-sub">
                Belum punya akun? <a onClick={() => setFormType(LoginFormType.signup)} className="text-sub underline hover:text-text"><i>daftar</i></a>
            </small>
        </div>
    );
}

const LoginPage: React.FC = () => {
    const [formType, setFormType] = useState(LoginFormType.signin);
    return (
        <LoginCard>
            { formType == LoginFormType.signin ? <LoginForm setFormType={setFormType}/> : <RegisterForm setFormType={setFormType}/>}
        </LoginCard>
    )
}

export default LoginPage;