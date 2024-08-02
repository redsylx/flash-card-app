import React, { ChangeEvent, useState } from "react";
import LoginCard from "../components/LoginCard";
import auth from "../services/auth";
import { Auth0Callback, Auth0Error, CrossOriginLoginOptions, DbSignUpOptions } from "auth0-js";

interface LoginPageProps {
    setFormType: React.Dispatch<React.SetStateAction<LoginFormType>>
}

enum LoginFormType {
    signin = 'signin',
    signup = 'signup'
}

const IconGoogleNormal : React.FC = () => {
    return(
        <svg className="fill-text" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
            <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
        </svg>
    )
}

const IconGoogleHover : React.FC = () => {
    return(
        <svg className="fill-bg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
            <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
        </svg>
    )
}

interface ILoginForm {
    email: string,
    password: string,
    repassword?: string
}

const LoginForm : React.FC<LoginPageProps> = ({ setFormType }) => {
    const [btnHoverState, setBtnHoverState] = useState(false);
    const [loginForm, setLoginForm] = useState<ILoginForm>({email:"", password:""});
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        })
    }

    const loginOption : CrossOriginLoginOptions = {
        password: loginForm.password,
        email: loginForm.email,
        responseType: "token",
        realm: import.meta.env.VITE_AUTH_CONNECTION,
        redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URL
    }

    const loginCallback : Auth0Callback<Auth0Error, any> = (error, result) => {
        if(error) {
            alert("Login Error")
            console.error(error)
            return
        }

        console.log("Login Success")
        console.log(result)
    }

    const login = () => {
        auth.login(loginOption,loginCallback)
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
                className="custom-button"
                onClick={login}
            >
                Log in
            </button>

            <hr className="mt-6 mb-2 border-sub-alt"/>

            <div className="flex justify-center mt-4">
                <button onMouseEnter={() => setBtnHoverState(true)} onMouseLeave={() => setBtnHoverState(false)} className="flex items-center justify-center w-full mb-2 p-2 bg-sub-alt rounded-lg text-white hover:bg-text">
                    {btnHoverState ? <IconGoogleHover/> : <IconGoogleNormal/>}
                </button>
            </div>

            <small className="mt-4 text-center text-sub">
                Belum punya akun? <a onClick={() => setFormType(LoginFormType.signup)} className="text-sub underline hover:text-text"><i>daftar</i></a>
            </small>
        </div>
    );
}

const SignupForm : React.FC<LoginPageProps> = ({ setFormType }) => {
    const [btnHoverState, setBtnHoverState] = useState(false);
    const [loginForm, setLoginForm] = useState<ILoginForm>({ email: "", password: "", repassword: ""})

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        })
    }

    const signUpCallback : Auth0Callback<Auth0Error, any> = (error, result) => {
        if(error) {
            alert("Sign Up error")
            console.error(error)
            return
        }

        console.log(result)
    }

    const signUpOption : DbSignUpOptions = {
        email: loginForm.email,
        password: loginForm.password,
        connection: import.meta.env.VITE_AUTH_CONNECTION,
    }

    const signUp = () => {
        
        try {
            console.log("email", signUpOption.email)
            console.log("conn", signUpOption.connection)
            console.log("pass", signUpOption.password)
            auth.signup(signUpOption, signUpCallback);
        } catch(err) {
            console.error("error", err)
        }
    }

    return(
        <form className="flex flex-col">
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginForm.email}
                className="custom-input mb-4 p-2"
                onChange={handleInputChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                className="custom-input mb-4 p-2"
                onChange={handleInputChange}
            />
            <input
                type="password"
                placeholder="Re-Enter Password"
                name="repassword"
                value={loginForm.repassword}
                className="custom-input mb-4 p-2"
                onChange={handleInputChange}
            />
            
            <button
                type="button"
                className="custom-button"
                onClick={signUp}
            >
                Sign up
            </button>

            <hr className="mt-6 mb-2 border-sub-alt"/>

            <div className="flex justify-center mt-4">
                <button onMouseEnter={() => setBtnHoverState(true)} onMouseLeave={() => setBtnHoverState(false)} className="flex items-center justify-center w-full mb-2 p-2 bg-sub-alt rounded-lg text-white hover:bg-text">
                    {btnHoverState ? <IconGoogleHover/> : <IconGoogleNormal/>}
                </button>
            </div>

            <small className="mt-4 text-center text-sub">
                Sudah punya akun? <a onClick={() => setFormType(LoginFormType.signin)} className="text-sub underline hover:text-text"><i>masuk</i></a>
            </small>
        </form>
    );
}

const LoginPage: React.FC = () => {
    const [formType, setFormType] = useState(LoginFormType.signin);
    return (
        <LoginCard>
            { formType == LoginFormType.signin ? <LoginForm setFormType={setFormType}/> : <SignupForm setFormType={setFormType}/> }
        </LoginCard>
    )
}

export default LoginPage;