import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
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
  width: 100%;
  height: 100%;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 18px;
`;

const FlashcardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #28a745;
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
