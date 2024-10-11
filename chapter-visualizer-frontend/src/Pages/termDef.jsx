import React, { useState } from 'react';
import "./termDef.css";
import axios from 'axios';

export default function TermDef() {
  document.title = "Term Visualizer - VisualEase";

  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [generationType, setGenerationType] = useState('image');
  const [analogy, setAnalogy] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const addAnalogyBox = () => {
    const analogyBox = document.getElementById("analogyBox");
    const paragraph = document.getElementById("description");
    analogyBox.classList.add("active");
    paragraph.innerText = "Generate an image of your term and definition.";
    setGenerationType('image');
  };

  const removeAnalogyBox = () => {
    const analogyBox = document.getElementById("analogyBox");
    const paragraph = document.getElementById("description");
    analogyBox.classList.remove("active");
    paragraph.innerText = "Generate an analogy image of your term and definition.";
    setGenerationType('analogy');
  };

  const handleGenerateImage = async () => {
    const prompt = `${term}: ${definition}${generationType === 'analogy' && analogy ? ` Analogy: ${analogy}` : ''}`;
    try {
      const response = await axios.post('http://localhost:5002/generate-image', { textPart: prompt });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="pageContainerContainer">
      <div className="pageContainer">
        <h1 className="title">Term Visualizer</h1>
        <p className="subTitle">Use our term visualizer to create images that represent your study terms or create analogies to remember term definitions.</p>
        <div className="container" data-aos="fade-up">
          <div className="container1">
            <p style={{ marginTop: '0px' }}>Input Term</p>
            <textarea
              placeholder="e.g., Mitochondria"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <p>Input Definition</p>
            <textarea
              style={{ height: '140px' }}
              placeholder="e.g., The powerhouse of a cell."
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
            />
          </div>
          <div className="container2">
            <form>
              <p style={{ marginTop: '0px' }}>Generation Type</p>
              <input
                type="radio"
                name="genType"
                value="image"
                id="image"
                onChange={addAnalogyBox}
                required
              />
              <label style={{ marginLeft: '5px' }} htmlFor="image">Image</label><br />
              <input
                type="radio"
                name="genType"
                value="analogy"
                onChange={removeAnalogyBox}
                required
              />
              <label style={{ marginLeft: '5px' }} htmlFor="analogy">Analogy</label>
              <p id="description"></p>
              <div id="analogyBox" className="active">
                <p>Analogy Box</p>
                <textarea
                  style={{ height: '120px' }}
                  placeholder="e.g., Compare the mitochondria to a part of the human body."
                  value={analogy}
                  onChange={(e) => setAnalogy(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <button className="generate" onClick={handleGenerateImage}>Generate Image</button>

        {/* Display the generated image if available */}
        {imageUrl && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}> {/* Center the image within the container */}
            <img 
              src={`http://localhost:5002/${imageUrl}`} 
              alt="Generated" 
              style={{ 
                maxWidth: '40%', /* Make sure the image is responsive */
                height: 'auto', /* Maintain aspect ratio */
                border: '2px solid #ddd', /* Optional: Add a border around the image */
                borderRadius: '8px' /* Optional: Add slight rounding to the corners */
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
