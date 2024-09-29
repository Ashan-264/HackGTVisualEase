import React, { useState } from 'react';
import "./home.css"

export default function home() {

  document.title = "VisualEase";

  return (
    <div className="homeContainer">
      <p class="homeTitle">Welcome to VisualEase!</p>
      <h1 className="slogan">Visualizing, made <span className="sloganpt2">easy</span></h1>
      <p>Transform your boring textbook to simple terms and definitions or images for you to study woo.</p>
      <a href="/TermDef"><button class="tryButton">Try it now!</button></a>
    </div>
  )
}
