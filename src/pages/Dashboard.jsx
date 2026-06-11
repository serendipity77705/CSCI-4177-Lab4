import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apartments } from "../data/mockData";
import { Link } from "react-router-dom";
import "../css/dashboard.css";

import NavBar from "../components/NavBar";

function ApartmentCard({ apartment }) {
    const navigate = useNavigate();
    return (
        <div className="apartment-card" onClick={() => navigate(`/apartments/${apartment.id}`)}>
            <img src={apartment.image} alt={apartment.name} />
            <div className="card-content">
                <h3>{apartment.name}</h3>
                <p className="address">📍 {apartment.address}</p>
                <p className="neighbourhood">{apartment.neighbourhood}</p>
                <div className="rating">
                    <span className="stars">{'★'.repeat(Math.floor(apartment.rating))}</span>
                    <span className="review-count">({apartment.reviewCount} reviews)</span>
                </div>

                {apartment.tags && apartment.tags.length > 0 && (
                    <div className="tags">
                        {apartment.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [filterNeighbourhood, setFilterNeighbourhood] = useState("all");

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    const neighborhoods = ["all", ...new Set(apartments.map((a) => a.neighbourhood))];

    const filteredAndSorted = useMemo(() => {
        let result = apartments;

        if (searchTerm) {
            result = result.filter((apt) =>
                apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterNeighbourhood !== "all") {
            result = result.filter((apt) => apt.neighbourhood === filterNeighbourhood);
        }

        if (sortBy === "name") {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "rating") {
            result = [...result].sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "reviews") {
            result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
        }

        return result;
    }, [searchTerm, sortBy, filterNeighbourhood]);

    return (
        <>
        <div className="dashboard-page">
            <NavBar onSearch={setSearchTerm} />
            
            <div className="dashboard-content">
            <div className="dash-header">
                <h1>Apartments in Halifax</h1>
                <p>Honest reviews from real tenants. Read before you rent.</p>
            </div>
            <div className="data">
                <div className="data-item">
                    <span className="number">{filteredAndSorted.length} </span><span className="label">apartments</span>
                </div>
                <div className="data-item">
                    <span className="number">13 </span><span className="label">reviews</span>
                </div>
                <div className="data-item">
                    <span className="number">4 </span><span className="label">neightbourhoods</span>
                </div>
            </div>
            <div className="dashboard-container">
                <div className="controls">
                    <select
                        className="filter-select"
                        value={filterNeighbourhood}
                        onChange={(e) => setFilterNeighbourhood(e.target.value)}
                    >
                        {neighborhoods.map((hood) => (
                            <option key={hood} value={hood}>
                                {hood === "all" ? "All Neighbourhoods" : hood}
                            </option>
                        ))}
                    </select>
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Name</option>
                        <option value="rating">Highest Rating</option>
                        <option value="reviews">Most Reviews</option>
                    </select>
                </div>

                <div className="apartments-grid">
                    {filteredAndSorted.length > 0 ? (
                        filteredAndSorted.map((apartment) => (
                            <Link key={apartment.id} to={`/apartments/${apartment.id}`}>
                                <div className="apt-card">
                                    <ApartmentCard apartment={apartment} />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="no-results">No apartments found</p>
                    )}
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default Dashboard;
