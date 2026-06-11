import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/authentication.css";
import validUsers from '../data/mockData';

export function validate(email, password) {
    const e = {};
    if (!email.includes("@")) e.email = "Invalid email";
    if (password.length < 6) e.password = "Password is too short";
    return e;
}

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { setUser } = useAuth();
    function handleSubmit(event) {
        event.preventDefault();

        const e = validate(email, password);

        if (Object.keys(e).length > 0) {
            setErrors(e);
            return;
        }

        const user = validUsers.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (user) {
            setUser(user);
            navigate("/dashboard");
        } else {
            setErrors({
                email: "Invalid email or password"
            });
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="card">
                    <h1 className="product-name">TenantTrails</h1>
                    <p>See what past tenants had to say, before you sign.</p>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        {errors.password && <span className="error">{errors.password}</span>}
                        
                        <button type="submit">Sign In</button>
                    </form>
                    <p id="redirect">Don't have an account? <Link to="/signup" id="link">Create one</Link></p>
                </div>
            </div>
        </>
    );
}

export default SignIn;
