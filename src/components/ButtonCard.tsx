import { useState } from "react";
import { useCardAuth } from "../hooks/HookCard"

export default () => {
    const [authResult, setAuthResult] = useState("");
    const cardAuth = useCardAuth();

    const click = async () => {
        const result = await cardAuth();
        const msg = result ?? "ERR";
        setAuthResult(msg);
    }

    return (
        <button className="custom-button" onClick={click}>Auth : {authResult}</button>
    )
}