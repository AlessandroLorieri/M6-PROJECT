import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar__inner">
                <div className="navbar__logo">Strive Blog</div>

                <nav className="navbar__links">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                        BlogPosts
                    </NavLink>
                    <NavLink to="/authors" className={({ isActive }) => (isActive ? "active" : "")}>
                        Authors
                    </NavLink>
                    <NavLink to="/new" className="navbar__btn">
                        + Nuovo Articolo
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
