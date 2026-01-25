import { Navigate, Outlet } from "react-router-dom"

export default function RequireAuth() {
    const token = localStorage.getItem("accessToken")

    //se non trova token porta l utente alla pagina login
    if (!token) {
        return <Navigate to="/login" replace />
    }
    // se trova token indirizza alla home
    return <Outlet />
}