import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPostPage.css";

export default function NewPostPage() {
    const navigate = useNavigate();

    const DEFAULT_AUTHOR_EMAIL = "mario.rossi@example.com"; 

    const [form, setForm] = useState({
        title: "",
        category: "",
        cover: "",
        readTimeValue: 5,
        readTimeUnit: "min",
        content: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const API = import.meta.env.VITE_API_URL;

            const payload = {
                title: form.title.trim(),
                category: form.category.trim(),
                cover: form.cover.trim(),
                readTime: {
                    value: Number(form.readTimeValue),
                    unit: form.readTimeUnit.trim(),
                },
                author: DEFAULT_AUTHOR_EMAIL, 
                content: form.content, 
            };

            const res = await fetch(`${API}/blogPosts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(`HTTP ${res.status} - ${msg}`);
            }

            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onReset = () => {
        setForm({
            title: "",
            category: "",
            cover: "",
            readTimeValue: 5,
            readTimeUnit: "min",
            content: "",
        });
        setError("");
    };

    return (
        <div className="np">
            <h1 className="np__title">Nuovo Articolo</h1>

            {error && <p className="np__error">Errore: {error}</p>}

            <form className="np__form" onSubmit={onSubmit}>
                <label className="np__label">
                    Titolo
                    <input
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        placeholder="Title"
                        required
                    />
                </label>

                <label className="np__label">
                    Categoria
                    <input
                        name="category"
                        value={form.category}
                        onChange={onChange}
                        placeholder="Categoria 1"
                        required
                    />
                </label>

                <label className="np__label">
                    Cover (URL immagine)
                    <input
                        name="cover"
                        value={form.cover}
                        onChange={onChange}
                        placeholder="https://..."
                    />
                </label>

                <div className="np__row">
                    <label className="np__label">
                        Read time (value)
                        <input
                            name="readTimeValue"
                            type="number"
                            min="1"
                            value={form.readTimeValue}
                            onChange={onChange}
                            required
                        />
                    </label>

                    <label className="np__label">
                        Read time (unit)
                        <input
                            name="readTimeUnit"
                            value={form.readTimeUnit}
                            onChange={onChange}
                            placeholder="min"
                            required
                        />
                    </label>
                </div>

                <label className="np__label">
                    Contenuto Blog
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={onChange}
                        placeholder="Scrivi qui..."
                        rows={10}
                        required
                    />
                </label>

                <div className="np__actions">
                    <button type="button" className="np__btn np__btn--ghost" onClick={onReset}>
                        Reset
                    </button>

                    <button type="submit" className="np__btn" disabled={loading}>
                        {loading ? "Invio..." : "Invia"}
                    </button>
                </div>
            </form>
        </div>
    );
}
