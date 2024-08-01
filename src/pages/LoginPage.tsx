import React from "react";
import LoginCard from "../components/LoginCard";

const LoginPage: React.FC = () => {
    return (
        <LoginCard>
            <form className="flex flex-col">
                <input
                    type="email"
                    placeholder="Email"
                    className="custom-input mb-4 p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="custom-input mb-2 p-2"
                />

                <small className="text-left text-gray-600 mb-4">
                    <a href="#" className="text-violet-500 hover:text-violet-700"><i>Lupa Password</i></a>
                </small>
                
                <button
                    type="submit"
                    className="font-bold mt-2 p-2 bg-neutral-700 text-violet-50 rounded hover:bg-violet-500"
                >
                    Log in
                </button>

                <small className="mt-4 text-center text-gray-600">
                    Belum punya akun? <a href="/signup" className="text-violet-500 hover:text-violet-700"><i>daftar</i></a>
                </small>

                <div className="flex justify-center mt-4">
                    <button className="flex items-center justify-center w-full mb-2 p-2 border-2 border-neutral-700 rounded text-white rounded hover:bg-neutral-800">
                    <img src="https://img.icons8.com/?size=30&id=17950&format=png&color=8b5cf6" alt="" />
                        <p className="mx-4">Log in with Google</p>
                    </button>
                </div>
            </form>
        </LoginCard>
    )
}

export default LoginPage;