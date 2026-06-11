import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

function NavBar({ onSearch }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    if (!user) {
        return null;
    }

    const initials = (
        user.name.split(" ")[0][0] +
        user.name.split(" ")[user.name.split(" ").length - 1][0]
    ).toUpperCase();

    function handleLogout() {
        logout();
        navigate("/signin");
    }

    function handleSearchChange(event) {
        const nextTerm = event.target.value;
        setSearchTerm(nextTerm);
        if (onSearch) {
            onSearch(nextTerm);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="product-name">TenantTrails</h1>
                <input
                    type="text"
                    placeholder="🔍 Search by name or address..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="navbar-right">
                <span className="initials">{initials}</span>
                <span className="username" onClick={() => navigate("/profile")}>
                    {user.name.split(" ")[0]}
                </span>
                <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
            </div>
        </nav>
    );
}

export default NavBar; 