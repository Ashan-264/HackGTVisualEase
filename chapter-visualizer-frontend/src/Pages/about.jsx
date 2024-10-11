import React, { useState } from 'react';
import "./about.css"

export default function about() {
    document.title = "About - VisualEase";

    return (
        <div className="aboutContainer" data-aos="fade-zoom-in" data-aos-duration="1500">
            <div class="aboutTop">
                <h1 style={{ fontSize: '60px', fontWeight: 'normal' }}>Visual<span className="blueGradient">Ease</span> Overview</h1>
                <p style={{ fontSize: '20px', marginBottom: '40px' }}>VisualEase is an innovative web application designed to enhance learning and retention through the power of visual aids. Inspired by popular tools like Quizlet, VisualEase generates customised flashcards that pair terms with vivid images, optimising the study experience for users.</p>
                <a href="#learnmore" id="learnmore"><button className="learnMore">&nbsp;Learn More &nbsp;<span style={{ verticalAlign: 'bottom' }} class="material-icons">keyboard_arrow_down</span></button></a>
            </div>


            <h2 style={{ fontSize: '40px', fontWeight: 'normal' }}>Key Features</h2>

            <div className="features" data-aos="flip-up">
                <p className="num">01</p>
                <strong className="featureHeading">Dynamic Flashcard Generation</strong>
                <p>Input any term-definition pair, and VisualEase creates a visually appealing flashcard complete with a relevant image. This feature harnesses the <span className="blueGradient">Picture Superiority Effect</span>, which states that people are more likely to remember information presented as images rather than text alone. By associating each term with a striking visual, users can enhance their recall.</p>
            </div>

            <div className="features" data-aos="flip-up">
                <p className="num">02</p>
                <strong className="featureHeading">Text File Segmentation</strong>
                <p>Users can upload large text files, and the application will intelligently segment the content to extract terms and definitions. For each term, VisualEase generates a corresponding image, making it easier to digest extensive material in manageable chunks.</p>
            </div>

            <div className="features" data-aos="flip-up">
                <p className="num">03</p>
                <strong className="featureHeading">Analogy and Metaphor Imagery</strong>
                <p>To further support memorization, VisualEase offers the unique capability to create analogy or metaphor images. For example, when learning about parts of the brain, the app might depict the brain as a house, with each part representing different rooms. This taps into <span className="blueGradient">Eidetic Memory</span>, a phenomenon where individuals can recall images with high precision. By crafting these metaphorical visuals, users can deepen their understanding and retention of complex concepts.</p>
            </div>

            <p style={{ fontSize: '20px', marginTop: '70px', marginBottom: '20px', textAlign: 'left' }}>VisualEase transforms traditional study methods by integrating</p>
            <p><span className="blueGradient" style={{ fontSize: '30px', textAlign: 'center', marginBottom: '20px' }}>visual learning principles</span>,</p>
            <p style={{ marginLeft: 'auto', marginRight: '0', width: '90%', fontSize: '20px', marginBottom: '20px', textAlign: 'right' }}>making it an invaluable tool for students, educators, and lifelong learners alike.</p>
            <p style={{ fontSize: '25px', marginTop: '70px', marginBottom: '90px', textAlign: 'center' }}> Whether you're preparing for exams or seeking to master new topics, <br /><span className="blueGradient">VisualEase empowers you to learn with ease and efficiency.</span></p>

            <h3>Contributers</h3>
            <ul style={{listStyleType: 'none', padding: '0', marginBottom: '50px'}}>
                <li>Ashan Deen</li>
                <li>Evelyn Chen</li>
                <li>Gauri Sharma</li>
                <li>Ira Pathak</li>
            </ul>
        </div>

    )
}
