import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/authentication.css"
import validUsers from '../data/mockData'
import { useAuth } from '../context/AuthContext'

function CreateAccount() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})
  const { setUser } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const e = {}

    if (!fullName.trim()) e.fullName = "Name is required"
    if (!email.includes("@")) e.email = "Invalid email"
    if (password.length < 6) e.password = "At least 6 characters"
    if (password !== confirmPassword) e.confirmPassword = "Passwords do not match"

    if (Object.keys(e).length > 0) { setErrors(e); return }

    if (validUsers[email]) {
      setErrors({ email: "Email already in use" })
      return
    }

    setUser({ name: fullName, email })
    navigate("/dashboard")
  }

  return (
    <div className="signup-page">
      <div className="card">
        <h1 className="product-name">TenantTrails</h1>
        <p>Create your account to submit reviews and comments.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Full name</label>
            <input type="text" placeholder="Your name"
              value={fullName} onChange={e => setFullName(e.target.value)} />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label>Password</label>
            <input type="password" placeholder="At least 6 characters"
              value={password} onChange={e => setPassword(e.target.value)} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label>Confirm Password</label>
            <input type="password" placeholder="Repeat password"
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit">Create Account</button>
        </form>

        <p id="redirect">Already have an account? <Link to="/signin" id="link">Sign in</Link></p>
      </div>
    </div>
  )
}

export default CreateAccount
