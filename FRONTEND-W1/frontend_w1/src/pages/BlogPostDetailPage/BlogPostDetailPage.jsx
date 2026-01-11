import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BlogPostDetailPage.css";

export default function BlogPostDetailPage() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API = import.meta.env.VITE_API_URL;
        const url = `${API}/blogPosts/${id}`;

        setError("");
        setLoading(true);

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                const p = json.post ?? json;
                setPost(p);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Caricamento...</p>;

    if (error) return <p className="bd__error">Errore: {error}</p>;

    if (!post) return <p>Nessun post trovato.</p>;

    return (
        <div className="bd">
            <Link to="/" className="bd__back">← Torna alla home</Link>

            <h1 className="bd__title">{post.title}</h1>

            <div className="bd__meta">
                {post.category} • {post.readTime?.value} {post.readTime?.unit} • {post.author}
            </div>

            {post.cover && <img className="bd__cover" src={post.cover} alt={post.title} />}

            {/* content è HTML: per esercizio va bene. */}
            {post.content && (
                <div
                    className="bd__content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            )}
        </div>
    );
}
