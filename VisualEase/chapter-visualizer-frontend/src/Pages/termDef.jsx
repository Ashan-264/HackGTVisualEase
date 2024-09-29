import React, { useState } from 'react';
import "./termDef.css"

export default function termDef() {

  document.title = "Term Visualizer - VisualEase";

  const addAnalogyBox = () => {
    var analogyBox = document.getElementById("analogyBox");
    var paragraph = document.getElementById("description");
    analogyBox.classList.add("active");
    paragraph.innerText = "Generate an image of your term and definition.";
  };

  const removeAnalogyBox = () => {
    var analogyBox = document.getElementById("analogyBox");
    var paragraph = document.getElementById("description");
    analogyBox.classList.remove("active");
    paragraph.innerText = "Generate an analogy image of your term and definition.";
  };

  return (
    <div className="pageContainerContainer">
      <div className="pageContainer">
        <h1 className="title" data-aos="fade-zoom-in" data-aos-duration="1500">Term Visualizer</h1>
        <p className="subTitle" data-aos="fade-zoom-in" data-aos-duration="1500">Use our term visualizer to create images that represent your study terms or create analogies to remember term definitions.</p>
        <div className="container" data-aos="fade-up" data-aos-duration="1500">
          <div className="container1">
            <p style={{ marginTop: '0px' }}>Input Term</p>
            <textarea placeholder="e.g., Mitochondria"></textarea>
            <p>Input Definition</p>
            <textarea style={{ height: '140px' }} placeholder="e.g., The powerhouse of a cell."></textarea>
          </div>
          <div className="container2">
            <form action="/action_page.php">
              <p style={{ marginTop: '0px' }}>Generation Type</p>
              <input
                type="radio"
                name="genType"
                value="image"
                id="image"
                onChange={addAnalogyBox}
                required
              />
              <label style={{ marginLeft: '5px' }} for="image">Image</label><br />
              <input
                type="radio"
                name="genType"
                value="analogy"
                onChange={removeAnalogyBox}
                required
              />
              <label style={{ marginLeft: '5px' }} for="analogy">Analogy</label>
              <p id="description"></p>
              <div id="analogyBox" className="active">
                <p>Analogy Details</p>
                <textarea style={{ height: '120px' }} placeholder="e.g., Compare the mitochondria to a part of the human body."></textarea>
              </div>

            </form>

          </div>

        </div>
        <button className="generate" data-aos="fade-zoom-in" data-aos-duration="1500" data-aos-offset="0">Generate Image</button>
      </div>
    </div>
  )
}
