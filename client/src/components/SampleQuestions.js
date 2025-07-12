import React from 'react';
import styled from 'styled-components';
import { FiHelpCircle } from 'react-icons/fi';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f59e0b, #f97316, #ef4444);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    
    @media (max-width: 768px) {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
  }
`;

const Title = styled.h3`
  color: #4f46e5;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    gap: 0.5rem;
  }
`;

const QuestionGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const QuestionButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 0.85rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.8rem;
  }
  color: #475569;
  line-height: 1.4;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
    transition: left 0.5s ease;
    border-radius: 12px;
  }

  &:hover {
    background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const QuestionCategory = styled.div`
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const sampleQuestions = [
  { category: "AI Stock Analysis", text: "What was the highest stock price in Jan-22?" },
  { category: "Intelligent Comparison", text: "Compare Bajaj Finserv performance Mar-22 to Jun-22" },
  { category: "Business Intelligence", text: "Tell me about BAGIC motor insurance growth trends" },
  { category: "Subsidiary Analysis", text: "How is Hero FinCorp performing this quarter?" },
  { category: "Market Insights", text: "What are the key growth drivers for Bajaj Markets?" },
  { category: "Financial Intelligence", text: "Analyze the revenue growth patterns" },
  { category: "AI Commentary", text: "Generate CFO commentary for investor presentation" },
  { category: "Predictive Analysis", text: "What's the outlook for next quarter?" },
  { category: "Contextual Analysis", text: "Explain the impact of Allianz partnership" }
];

function SampleQuestions({ onQuestionClick }) {
  return (
    <Container>
      <Title>
        <FiHelpCircle />
        Sample Questions
      </Title>
      <QuestionGrid>
        {sampleQuestions.map((question, index) => (
          <QuestionButton
            key={index}
            onClick={() => onQuestionClick(question.text)}
          >
            <QuestionCategory>{question.category}</QuestionCategory>
            {question.text}
          </QuestionButton>
        ))}
      </QuestionGrid>
    </Container>
  );
}

export default SampleQuestions;
