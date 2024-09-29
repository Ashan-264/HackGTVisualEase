import React, { useState } from 'react';
import "./home.css"

export default function home() {

  document.title = "VisualEase";

  return (
    <div className="homeContainer">
      <div style={{paddingLeft: '20px', paddingRight: '20px'}} data-aos="fade-down" data-aos-duration="3000"><p class="homeTitle">Welcome to VisualEase!</p></div>
      <h1 className="slogan" data-aos="fade-up" data-aos-duration="3000">Visualizing, made <span className="sloganpt2">easy</span></h1>
      <p className="homeSubTitle"style={{paddingLeft: '20px', paddingRight: '20px'}} data-aos="fade-up" data-aos-duration="3000">Transform paragraphs into flashcards and images for simplified studying.</p>
      <a href="/visualize"><button class="tryButton" data-aos="zoom-in" data-aos-offset="-10" data-aos-duration="3000">Try it now!</button></a>
    </div>
  )
}
