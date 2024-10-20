import React, { useState } from 'react';
import "./termDef.css";

export default function TermDef() {
  document.title = "Term Visualizer - VisualEase";

  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [generationType, setGenerationType] = useState('image');
  const [analogy, setAnalogy] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

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
    setLoading(true); // Start loading
    setImageUrl('');  // Clear previous image
  
    try {
      const response = await fetch(
        'https://python-flask-visual-ease.vercel.app/api/image_generator',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ textPart: prompt }),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
  
      // Log the received data to verify the response structure
      console.log('Response from API:', data);
  
      // Log the image URL to confirm it's correctly received
      console.log('Received Image URL:', data.imageUrl);
  
      setImageUrl(data.imageUrl); // Set the image URL from Blob storage
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  return (
    <div className="pageContainerContainer">
      <div className="pageContainer">
        <h1 className="title">Term Visualizer</h1>
        <p className="subTitle">
          Use our term visualizer to create images that represent your study terms or create analogies to remember term definitions.
        </p>
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
        <button className="generate" onClick={handleGenerateImage} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        {/* Display the generated image if available */}
        {imageUrl && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img
              src={imageUrl}
              alt="Generated"
              style={{
                maxWidth: '40%',
                height: 'auto',
                border: '2px solid #ddd',
                borderRadius: '8px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
