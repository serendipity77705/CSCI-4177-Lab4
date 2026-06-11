import React from "react";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../css/Landing.css'

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="main">
        <div>
          <nav>
            <div className="product-name">TenantTrails</div>
            <div className="navbar-buttons">
              <button type="button" className="button" id="sign-in" onClick={() => navigate('/signin')}>Sign in</button>
              <button type="button" className="button" id="get-started" onClick={() => navigate('/signup')}>Get Started</button>
            </div>
          </nav>
        </div>

          <div className="hero">
            <section className="launching">Launching in Halifax, Nova Scotia</section>
            <div className="statement">
              <h1>Know what you're signing before you sign it.</h1>
              <p id="intro">Read honest review from past tenants. See AI-generated summaries. Make informed decisions about where you live.</p>
            </div>

            <div className="account-setup">
              <button type="button" className="button" id="create-account" onClick={() => navigate('/signup')}>Create Account</button>
              <button type="button" className="button" id="sign-in-2" onClick={() => navigate('/signin')}>Sign In</button>
            </div>
          </div>

          <div className="features">
            <div id="reviews">
              <h2>⭐️</h2>
              <h2>Verified Reviews</h2>
              <p>Real ratings with photos and videos from past tenants.</p>
            </div>

            <div id="ai">
              <h2>🤖</h2>
              <h2>AI Summaries</h2>
              <p>key issues and sentiment extracted from every review.</p>
            </div>

            <div id="questions">
              <h2>💬</h2>
              <h2>Ask Questions</h2>
              <p>key issues and sentiment extracted from every review.</p>
            </div>
          </div>
      </div>
    </>
  )
}

export default Landing
