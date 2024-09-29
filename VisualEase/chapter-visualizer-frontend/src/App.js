import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Pages/navbar';
import TermDef from './Pages/termDef';  // Ensure this is correctly pointed to your updated TermDef.jsx
import ScrTextChunker from "./Pages/ScrTextChunker";
import FlashCards from './Pages/FlashCards';
import About from "./Pages/about";
import Home from "./Pages/home";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    const [textInput, setTextInput] = useState('');
    const [summaries, setSummaries] = useState([]);
    const [images, setImages] = useState({});
    const [terms, setTerms] = useState([]);  // New state for storing terms

    const handleTextSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5002/summarize', { chapterText: textInput }); // Updated to port 5002
            const parts = response.data; // Assuming response is an array of summarized parts
            setSummaries(parts);

            // Generate images for each summary
            parts.forEach(async (part, index) => {
                const imageResponse = await axios.post('http://localhost:5002/generate-image', { textPart: part }); // Updated to port 5002
                setImages(prevImages => ({ ...prevImages, [index]: imageResponse.data.imageUrl }));
            });
        } catch (error) {
            console.error('Error processing text:', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
          AOS.init();
        }, 120);
        AOS.refresh();
      }, []); // a library for transitions

    return (
        <div>
            <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/TermDef" element={<TermDef />} />
                    <Route 
                        path="/Text Chunker" 
                        element={<ScrTextChunker setTerms={setTerms} />}  // Pass setTerms to ScrTextChunker
                    />
                    <Route 
                        path="/FlashCards" 
                        element={<FlashCards terms={terms} />}  // Pass terms to FlashCards
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
        </div>
    );
}

export default App;
