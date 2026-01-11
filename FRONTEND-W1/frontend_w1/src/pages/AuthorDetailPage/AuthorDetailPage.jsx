import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AuthorDetailPage.css";

export default function AuthorDetailPage() {
    const { id } = useParams();

    const [author, setAuthor] = useState(null);
    const [posts, setPosts] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 3;

    useEffect(() => {
        const API = import.meta.env.VITE_API_URL;
        const url = `${API}/authors/${id}/blogPosts?page=${page}&limit=${limit}`;

        setError("");
        setLoading(true);

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                setAuthor(json.author || null);
                setPosts(json.data || []);
                setTotalPages(json.totalPages || 1);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, page]);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p className="ad__error">Errore: {error}</p>;
    if (!author) return <p>Nessun autore trovato.</p>;

    return (
        <div className="ad">
            <Link to="/authors" className="ad__back">← Torna agli autori</Link>

            <div className="ad__header">
                {author.avatar && (
                    <img className="ad__avatar" src={author.avatar} alt={`${author.name} ${author.surname}`} />
                )}

                <div>
                    <h1 className="ad__title">{author.name} {author.surname}</h1>
                    <div className="ad__meta">{author.email}</div>
                </div>
            </div>

            <h2 className="ad__subtitle">Articoli</h2>

            {posts.length === 0 ? (
                <p>Nessun post per questo autore.</p>
            ) : (
                <ul className="ad__grid">
                    {posts.map((p) => (
                        <li key={p._id} className="ad__card">
                            <Link to={`/blogposts/${p._id}`} className="ad__cardLink">
                                {p.cover && <img className="ad__img" src={p.cover} alt={p.title} />}
                                <div className="ad__body">
                                    <h3 className="ad__cardTitle">{p.title}</h3>
                                    <div className="ad__cardMeta">
                                        {p.category} • {p.readTime?.value} {p.readTime?.unit}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {totalPages > 1 && (
                <div className="ad__pager">
                    <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                        Prev
                    </button>

                    <span>Pagina {page} / {totalPages}</span>

                    <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
