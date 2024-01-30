import { useState } from "react";
import "./Navbar.css";
export default function Navbar({ query, setQuery, totalResults }) {
  return (
    <div className="navbar">
      <p className="logo">
        🍿<span>usePopcorn</span>
      </p>
      <div className="search-box">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="serach..."
        />
        <i className="fa-solid fa-search" onClick={() => setQuery(query)}></i>
      </div>
      <p className="result-count">Found {totalResults} Results</p>
    </div>
  );
}
