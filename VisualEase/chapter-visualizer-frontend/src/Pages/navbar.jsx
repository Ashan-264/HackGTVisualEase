import React from 'react'
import "./navbar.css"
import { Link } from "react-router-dom";

export default function Navbar() {
  const toggleNav = () => {
    var navRightElement = document.getElementById("navRight");
    var burgerElement = document.getElementById("burger");
    burgerElement.classList.toggle("toggle");
    if (navRightElement.style.display === 'none' || navRightElement.style.display === '') {
        navRightElement.style.display = 'flex'; // Show the nav
    } else {
        navRightElement.style.display = 'none'; // Hide the nav
    }
  }

  return (
    <nav>
      <div className="mobile">

        <div className="navLeft">
          <div><a href="/"><h1><span style={{ color: '#FFFFFF' }}>VISUAL</span><span className="logopt2">EASE</span></h1></a></div>
        </div>

        <a id="burger" onClick={toggleNav} className="toggle-button burger burgerinitial">
          <span className="bar line1"></span>
          <span className="bar line2"></span>
          <span className="bar line3"></span>
        </a>

      </div>


      <div id="navRight" className="navRight">
        <ul>
          <li><a href="/TermDef"><button component={Link} className="menuItem">Term Visualizer</button></a></li>
          <li><a href="/Text Chunker"><button component={Link} className="menuItem">Term Finder</button></a></li>
          <li><a href="/about"><button component={Link} className="menuItem">About</button></a></li>
        </ul>
      </div>
    </nav>
  )
}