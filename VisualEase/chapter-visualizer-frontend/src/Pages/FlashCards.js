import React from 'react';
import styled from 'styled-components';

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
  max-width: 1000px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #fff;
  font-size: 24px;
`;

const FlashcardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const Flashcard = styled.div`
  perspective: 1000px;
`;

const FlashcardInner = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const FlashcardFront = styled.div`
  position: absolute;
  width: 80%;
  margin-right: 7%;
  height: 80%;
  border: solid 2px #1B3E5F;
  background-color: #00264980;
  color: white;
  border-radius: 8px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 20px;
`;

const FlashcardBack = styled.div`
  position: absolute;
  width: 80%;
  margin-left: 7%;
  height: 80%;
  background: -webkit-linear-gradient(45deg, rgb(12, 116, 214), rgb(69, 132, 191));
  border: solid 1px rgba(204, 223, 234, 0.236);
  color: white;
  border-radius: 8px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 16px;
  transform: rotateY(180deg);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Flashcards = ({ terms = [] }) => {  // Ensure terms defaults to an empty array if undefined

  document.title = "Flashcards - VisualEase";

  return (
    <Container>
      <ContentWrapper>
        <SectionTitle>Flashcards: Terms & Definitions</SectionTitle>
        <FlashcardGrid>
          {terms.length > 0 ? (
            terms.map((term, index) => (
              <Flashcard key={index}>
                <FlashcardInner>
                  <FlashcardFront>
                    {term.termName}
                  </FlashcardFront>
                  <FlashcardBack>
                    {term.definition}
                  </FlashcardBack>
                </FlashcardInner>
              </Flashcard>
            ))
          ) : (
            <p>No terms available to display.</p>  // Display a message if no terms are available
          )}
        </FlashcardGrid>
      </ContentWrapper>
    </Container>
  );
};

export default Flashcards;