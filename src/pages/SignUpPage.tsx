import React from "react";
import LoginCard from "../components/LoginCard";

const SignUpPage: React.FC = () => {
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
                    className="custom-input mb-4 p-2"
                />
                <input
                    type="password"
                    placeholder="Re-Enter Password"
                    className="custom-input mb-4 p-2"
                />
                
                <button
                    type="submit"
                    className="font-bold mt-2 p-2 bg-neutral-700 text-violet-50 rounded hover:bg-violet-500"
                >
                    Sign up
                </button>

                <small className="mt-4 text-center text-gray-600">
                    Sudah punya akun? <a href="/login" className="text-violet-500 hover:text-violet-700"><i>masuk</i></a>
                </small>

                <div className="flex justify-center mt-4">
                    <button className="flex items-center justify-center w-full mb-2 p-2 border-2 border-neutral-700 rounded text-white rounded hover:bg-neutral-800">
                    <img src="https://img.icons8.com/?size=30&id=17950&format=png&color=8b5cf6" alt="" />
                        <p className="mx-4">Sign up with Google</p>
                    </button>
                </div>
            </form>
        </LoginCard>
    )
}

export default SignUpPage;