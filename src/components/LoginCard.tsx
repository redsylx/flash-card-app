import React from "react"

interface LoginCardProps {
    children: React.ReactNode;
}

const LoginCard: React.FC<LoginCardProps> = ({children}) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-950">
            <div className="bg-neutral-900 p-6 rounded-lg border-2 border-neutral-800 w-80">
                <h1 className="text-violet-500 text-2xl font-bold mb-6">FCA</h1>
                {children}
            </div>
        </div>
    )
}

export default LoginCard;