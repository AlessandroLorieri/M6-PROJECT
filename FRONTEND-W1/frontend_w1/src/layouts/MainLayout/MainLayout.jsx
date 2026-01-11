import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./MainLayout.css";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="layout__container">
                <Outlet />
            </main>
        </>
    );
}
