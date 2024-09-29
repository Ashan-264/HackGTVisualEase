import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #000;
  min-height: 100vh;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Section = styled.section`
  margin: 0 auto 40px auto;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 20px;
  max-width: 1000px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: normal;
`;

const TextInput = styled.textarea`
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  min-height: 100px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  border: solid 1px rgba(255, 255, 255, 0.021);
  padding: 7px;
  color: white;
`;

const LevelInput = styled.input`
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  border: solid 1px rgba(255, 255, 255, 0.021);
  padding: 7px;
  color: white;
`;

const TermsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;  // Two columns, one for terms and one for definitions
  gap: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
`;

const TableHeader = styled.div`
  font-weight: bold;
  text-align: center;
`;

const TermItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e9e9e9;

  &:last-child {
    border-bottom: none;
  }
`;

const TermText = styled.span`
  color: #333;
  font-weight: bold;
`;

const DefinitionText = styled.span`
  color: #333;
`;

const Button = styled.button`
  font-family: 'Work Sans';
  margin: 30px 10px 20px 10px;
  padding: 10px 30px;
  background: -webkit-linear-gradient(45deg, rgb(12, 116, 214), rgb(69, 132, 191));
  border: solid 1px rgba(204, 223, 234, 0.236);
  color: white;
  border-radius: 100px;
  font-size: 16px;
  transition: all 0.75s ease;

  &:hover {
  filter: brightness(130%);
  cursor: pointer;
  }
`;

const ExportButton = styled.button`
  font-family: 'Work Sans';
  margin: 10px 10px 50px 10px;
  padding: 10px 30px;
  background: none;
  border: solid 1px #007bff;
  color: white;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  transition: all 0.75s ease;

  &:hover {
    border: solid 1px #54a6ff;
  }
`;

const ScrTextChunker = ({ setTerms }) => {
  const [text, setText] = useState('');
  const [terms, localSetTerms] = useState([]);
  const [studyLevel, setStudyLevel] = useState('Beginner');
  const [loading, setLoading] = useState(false);

  const handleGenerateTerms = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/extract_terms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, level: studyLevel })
      });

      const data = await response.json();

      const parsedTerms = data.terms_and_definitions
        .split(/\n\d+\.\s/)
        .filter(entry => entry.trim() !== '')
        .map(entry => {
          const match = entry.match(/^\*\*(.*?)\*\*:\s(.*)$/);
          if (match) {
            return { termName: match[1].trim(), definition: match[2].trim() };
          } else {
            return null;
          }
        })
        .filter(item => item !== null);

      if (parsedTerms.length === 0) {
        alert("No terms could be extracted. Please check the input and try again.");
      }

      localSetTerms(parsedTerms);
      setTerms(parsedTerms);
    } catch (error) {
      console.error("Error generating terms:", error);
    }
    setLoading(false);
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Generated Terms & Definitions", 10, 10);
    
    doc.autoTable({
      head: [['Term', 'Definition']],
      body: terms.map(term => [term.termName, term.definition]),
      startY: 20,
    });

    doc.save("terms_and_definitions.pdf");
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '10px', marginTop: '0px' }}>Term Finder</h1>
      <p style={{ marginTop: '0px' }}>Use our term finder to generate terms based on textbook pages, articles, and more!</p>
      <ContentWrapper>
        <Section>
          <SectionTitle>Input Text</SectionTitle>
          <TextInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here..."
          />

          <SectionTitle>Study Level</SectionTitle>
          <LevelInput
            type="text"
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            placeholder="Enter study level (e.g., undergraduate, graduate, expert)"
          />
          
          <Button onClick={handleGenerateTerms} disabled={loading || !text || !studyLevel}>
            {loading ? "Generating..." : "Generate Terms"}
          </Button>
        </Section>

        <Section>
          <SectionTitle>Generated Terms & Definitions</SectionTitle>
          <TermsTable>
            <TableHeader>Term</TableHeader>
            <TableHeader>Definition</TableHeader>
            {terms.map((term, index) => (
              <React.Fragment key={index}>
                <TermItem>
                  <TermText>{term.termName}</TermText>
                </TermItem>
                <TermItem>
                  <DefinitionText>{term.definition}</DefinitionText>
                </TermItem>
              </React.Fragment>
            ))}
          </TermsTable>
        </Section>
        
        <Button>Generate Images</Button>
        <ExportButton onClick={handleExportToPDF}>Export to PDF</ExportButton>
        
        <Link to="/flashcards">
          <Button>Flash Cards</Button>
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default ScrTextChunker;
