import React from 'react';
import styled from 'styled-components';
import { FiHelpCircle } from 'react-icons/fi';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  
  @media (max-width: 768px) {
    padding: 0.375rem;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #007BFF, #0056B3, #003D7A);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    
    @media (max-width: 768px) {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
`;

const Title = styled.h3`
  color: #007BFF;
  margin-bottom: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }
  
  svg {
    width: 14px;
    height: 14px;
    
    @media (max-width: 768px) {
      width: 12px;
      height: 12px;
    }
  }
`;

const QuestionGrid = styled.div`
  display: grid;
  gap: 0.25rem;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.25rem;
  max-height: calc(100% - 40px);
  
  /* Optimize for showing exactly 4 questions initially */
  grid-auto-rows: minmax(auto, 1fr);
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 123, 255, 0.05);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0066CC 0%, #004799 100%);
  }
  
  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #007BFF rgba(0, 123, 255, 0.05);
  
  /* Smooth scrolling behavior */
  scroll-behavior: smooth;
`;

const QuestionButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.375rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.7rem;
  font-family: 'Inter', sans-serif;
  line-height: 1.3;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    padding: 0.25rem;
    font-size: 0.65rem;
    min-height: 55px;
  }
  
  @media (max-width: 480px) {
    padding: 0.2rem;
    font-size: 0.6rem;
    min-height: 50px;
  }
  color: #475569;
  line-height: 1.3;
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
    background: linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.1), transparent);
    transition: left 0.5s ease;
    border-radius: 10px;
  }

  &:hover {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-color: #007BFF;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.15);
    
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
  color: #007BFF;
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
  { category: "Contextual Analysis", text: "Explain the impact of Allianz partnership" },
  { category: "Quarterly Analysis", text: "Show me Q1 vs Q2 vs Q3 performance comparison" },
  { category: "AUM Intelligence", text: "What were the Q3 FY25 AUM numbers for all businesses?" },
  { category: "ROE Progression", text: "Analyze ROE progression across all quarters" },
  { category: "Housing Finance", text: "Compare housing finance performance quarterly" },
  { category: "Insurance Analysis", text: "BAGIC vs BALIC performance analysis" },
  { category: "Digital Transformation", text: "Digital transformation progress across quarters" },
  { category: "ESG Intelligence", text: "ESG initiatives and green finance growth trends" },
  { category: "Comprehensive View", text: "Complete subsidiary performance overview" }
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
