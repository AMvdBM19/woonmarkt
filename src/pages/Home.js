import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <nav className="nav">
        <h2>WoonMarkt</h2>
        <div className="nav-links">
          <span>Browse</span>
          <span>AI Match</span>
          <span>Login</span>
        </div>
      </nav>

      <section className="hero">
        <div className="glow"></div>

        <h1>Find Your Dream Home</h1>
        <p>Rent • Buy • Exchange with AI</p>

        <div className="search">
          <input placeholder="City" />
          <select>
            <option>Type</option>
            <option>Rent</option>
            <option>Sale</option>
            <option>Exchange</option>
          </select>
          <button>Search</button>
        </div>
      </section>

      <section className="section">
        <h2>Featured Homes</h2>

        <div className="grid">
          {[1,2,3,4].map((i) => (
            <div className="card" key={i}>
              <div className="img"></div>

              <div className="content">
                <h3>Modern House</h3>
                <p>Amsterdam</p>
                <p className="price">€1500</p>
                <button>View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ai">
        <h2>AI Match</h2>
        <p>Tell us what you want</p>

        <input placeholder="3 rooms, near center..." />
        <button>Generate</button>
      </section>

    </div>
  );
}

export default Home;