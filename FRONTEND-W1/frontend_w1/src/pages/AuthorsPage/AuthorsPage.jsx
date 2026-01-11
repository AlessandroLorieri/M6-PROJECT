import { useEffect, useState } from "react";
import "./AuthorsPage.css";
import { Link } from "react-router-dom";


export default function AuthorsPage() {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 6;

    useEffect(() => {
        const API = import.meta.env.VITE_API_URL;
        const url = `${API}/authors?page=${page}&limit=${limit}`;

        setError("");

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                setAuthors(json.data || []);
                setTotalPages(json.totalPages || 1);
            })
            .catch((err) => setError(err.message));
    }, [page]);

    return (
        <div>
            <h1 className="ap__title">Authors</h1>

            {error && <p className="ap__error">Errore: {error}</p>}
            {!error && authors.length === 0 && <p>Nessun autore trovato!</p>}

            <ul className="ap__grid">
                {authors.map((a) => (
                    <li key={a._id} className="ap__card">
                        <Link to={`/authors/${a._id}`} className="ap__cardLink">
                            <div className="ap__row">
                                {a.avatar && (
                                    <img className="ap__avatar" src={a.avatar} alt={`${a.name} ${a.surname}`} />
                                )}
                                <div>
                                    <h3 className="ap__name">{a.name} {a.surname}</h3>
                                    <div className="ap__meta">{a.email}</div>
                                </div>
                            </div>
                        </Link>
                    </li>

                ))}
            </ul>

            {totalPages > 1 && (
                <div className="ap__pager">
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
