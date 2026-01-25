import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) navigate("/", { replace: true });
    }, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `HTTP ${res.status}`);
            }

            localStorage.setItem("accessToken", data.accessToken);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lp_container">
            <div className="lp_card">
                <h1 className="lp_title">Login</h1>
                <p className="lp_subtitle">Accedi con email e password</p>

                {error && <p className="lp_error">Errore: {error}</p>}

                <form className="lp_form" onSubmit={handleSubmit}>
                    <input
                        className="lp_input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="lp_input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="lp_button" type="submit" disabled={loading}>
                        {loading ? "Accesso..." : "Accedi"}
                    </button>

                    <a
                        className={`lp_button lp_google ${loading ? "lp_disabled" : ""}`}
                        href={loading ? "#" : `${API}/auth/google`}
                        onClick={(e) => {
                            if (loading) e.preventDefault();
                        }}
                    >
                        <span className="lp_googleIcon" aria-hidden="true">
                            <svg viewBox="0 0 48 48" width="25" height="25">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.2 3.6l6.9-6.9C35.9 2.4 30.5 0 24 0 14.6 0 6.5 5.4 2.6 13.2l8 6.2C12.4 13.1 17.7 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.5c-.3 2-1.6 5-4.8 7.1l7.4 5.7c4.3-4 7-9.9 7-16.5z" />
                                <path fill="#FBBC05" d="M10.6 28.8c-.5-1.4-.8-2.9-.8-4.5s.3-3.1.8-4.5l-8-6.2C.9 16.9 0 20.3 0 24.3s.9 7.4 2.6 10.7l8-6.2z" />
                                <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2 1.4-4.7 2.4-8.5 2.4-6.3 0-11.6-3.6-13.4-8.7l-8 6.2C6.5 42.6 14.6 48 24 48z" />
                            </svg>
                        </span>
                        Accedi con Google
                    </a>

                </form>
            </div>
        </div>
    );
}
