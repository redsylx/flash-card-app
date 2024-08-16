import React from "react"

interface LoginCardProps {
    children: React.ReactNode;
}

const LoginCard: React.FC<LoginCardProps> = ({children}) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-bg">
            <div className="p-6 rounded-xl w-80 bg-bg border-2 border-sub-alt">
                <h1 className="text-text text-2xl font-bold mb-6">memento</h1>
                {children}
            </div>
        </div>
    )
}

export default LoginCard;