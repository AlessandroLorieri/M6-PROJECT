import { useEffect, useState } from "react";
import "./BlogPostPage.css";
import { Link } from "react-router-dom";


export default function BlogPostPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 3;

    useEffect(() => {
        const API = import.meta.env.VITE_API_URL;
        const url = `${API}/blogPosts?page=${page}&limit=${limit}${search ? `&title=${encodeURIComponent(search)}` : ""
            }`;

        setError("");

        const token = localStorage.getItem("accessToken")

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                setPosts(json.data || []);
                setTotalPages(json.totalPages || 1);
            })
            .catch((err) => setError(err.message));
    }, [search, page]);

    return (
        <div>
            <h1 className="bp__title">Benvenuto sullo Strive Blog!</h1>

            {error && <p className="bp__error">Errore: {error}</p>}

            <div className="bp__search">
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    placeholder="Cerca per titolo..."
                />
            </div>

            {!error && posts.length === 0 && <p>Nessun Blog Post trovato!</p>}

            <ul className="bp__grid">
                {posts.map((p) => (
                    <li key={p._id} className="bp__card">
                        <Link to={`/blogposts/${p._id}`} className="bp__cardLink">
                            {p.cover && <img className="bp__img" src={p.cover} alt={p.title} />}

                            <div className="bp__body">
                                <h3 className="bp__cardTitle">{p.title}</h3>
                                <div className="bp__meta">
                                    {p.category} • {p.readTime?.value} {p.readTime?.unit} • {p.author}
                                </div>
                            </div>
                        </Link>
                    </li>

                ))}
            </ul>

            {totalPages > 1 && (
                <div className="bp__pager">
                    <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                        Prev
                    </button>

                    <span>
                        Pagina {page} / {totalPages}
                    </span>

                    <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
