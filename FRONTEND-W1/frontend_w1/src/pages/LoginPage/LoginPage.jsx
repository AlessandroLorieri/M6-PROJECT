import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
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
            </form>
        </div>
    </div>
);
}
