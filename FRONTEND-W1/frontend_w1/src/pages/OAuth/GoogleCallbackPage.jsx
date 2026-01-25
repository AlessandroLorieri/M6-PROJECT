import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("accessToken", token);
            navigate("/", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    return <p style={{ padding: 24 }}>Accesso con Google in corso...</p>;
}
