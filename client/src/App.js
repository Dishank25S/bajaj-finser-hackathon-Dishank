import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend, FiMessageCircle, FiUser, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import ChatMessage from './components/ChatMessage';
import StockChart from './components/StockChart';
import SampleQuestions from './components/SampleQuestions';
import ComprehensiveAnalytics from './components/ComprehensiveAnalytics';
import { sendMessage } from './api/chatApi';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  position: relative;
  font-family: 'Inter', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" style="stop-color:rgba(255,255,255,0.1)"/><stop offset="100%" style="stop-color:rgba(255,255,255,0)"/></radialGradient></defs><circle cx="200" cy="200" r="150" fill="url(%23a)"/><circle cx="800" cy="300" r="100" fill="url(%23a)"/><circle cx="600" cy="700" r="120" fill="url(%23a)"/></svg>') no-repeat;
    background-size: cover;
    pointer-events: none;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
    gap: 0.5rem;
  }
  
  .logo-icon {
    background: linear-gradient(135deg, #ffd700 0%, #ffed4a 100%);
    padding: 8px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    gap: 1rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(16, 185, 129, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 1px solid rgba(16, 185, 129, 0.3);
    
    @media (max-width: 480px) {
      padding: 0.4rem 0.8rem;
      font-size: 0.75rem;
    }
    
    .dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  gap: 2rem;
  position: relative;
  z-index: 5;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const ChatContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    border-radius: 16px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  color: white;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
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
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: float 20s infinite linear;
  }
  
  @keyframes float {
    0% { transform: translateX(-100px); }
    100% { transform: translateX(100px); }
  }
  
  .chat-icon {
    background: rgba(255, 255, 255, 0.2);
    padding: 12px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .chat-info h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  .chat-info p {
    margin: 0.5rem 0 0 0;
    opacity: 0.9;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 500px;
  min-height: 400px;
  background: linear-gradient(to bottom, #fafafa 0%, #f8fafc 100%);
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 300px;
    max-height: 400px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  }
`;

const ChatInputContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const ChatInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 1rem;
  background: transparent;
  color: #374151;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
  }
  
  &::placeholder {
    color: #9ca3af;
    font-family: 'Inter', sans-serif;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }
`;

const Sidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
    
    > * {
      min-width: 300px;
      flex-shrink: 0;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    overflow-x: visible;
    
    > * {
      min-width: auto;
      flex-shrink: 1;
    }
  }
`;

const WelcomeMessage = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
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
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    
    @media (max-width: 768px) {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
  }
  
  h3 {
    color: #4f46e5;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  p {
    color: #6b7280;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
  
  ul {
    text-align: left;
    color: #6b7280;
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
    
    li {
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
      border-left: 3px solid #e5e7eb;
      transition: border-color 0.3s ease;
      
      &:hover {
        border-color: #6366f1;
      }
    }
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  .loading-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    
    @media (max-width: 480px) {
      width: 32px;
      height: 32px;
    }
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.25rem;
  
  span {
    width: 0.5rem;
    height: 0.5rem;
    background: #6b7280;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage);
      setMessages(prev => [...prev, { type: 'bot', content: response.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error while processing your request. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSampleQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <AppContainer>
      <Header>
        <Logo>
          <div className="logo-icon">
            <FiTrendingUp />
          </div>
          <div>
            <div>Bajaj Finserv AI Assistant</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '400', opacity: '0.8' }}>
              Financial Intelligence Platform
            </div>
          </div>
        </Logo>
        <HeaderInfo>
          <div className="status-indicator">
            <div className="dot"></div>
            Live Data
          </div>
          <div>Q1-Q4 FY25</div>
        </HeaderInfo>
      </Header>
      
      <MainContent>
        <ChatContainer>
          <ChatHeader>
            <div className="chat-icon">
              <FiMessageCircle size={28} />
            </div>
            <div className="chat-info">
              <h3>AI Financial Assistant</h3>
              <p>Ask me about stock prices, earnings insights, and business intelligence</p>
            </div>
          </ChatHeader>
          
          <ChatMessages>
            {messages.length === 0 && (
              <WelcomeMessage>
                <h3 style={{ color: '#4f46e5', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                  Welcome to Bajaj Finserv AI Assistant
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                  I can help you analyze Bajaj Finserv's stock performance, earnings call insights, 
                  and provide financial commentary. Try asking me questions like:
                </p>
                <ul style={{ textAlign: 'left', color: '#6b7280', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
                  <li>• What was the highest stock price in Jan-22?</li>
                  <li>• Compare Bajaj Finserv from Mar-22 to Jun-22</li>
                  <li>• Tell me about organic traffic of Bajaj Markets</li>
                  <li>• Why is BAGIC facing headwinds in Motor insurance?</li>
                </ul>
              </WelcomeMessage>
            )}
            
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            
            {isLoading && (
              <LoadingIndicator>
                <div className="loading-avatar">
                  <FiMessageCircle />
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>AI Assistant is thinking...</div>
                  <LoadingDots>
                    <span></span>
                    <span></span>
                    <span></span>
                  </LoadingDots>
                </div>
              </LoadingIndicator>
            )}
            
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          <ChatInputContainer>
            <ChatInputWrapper>
              <ChatInput
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Bajaj Finserv stock prices, earnings insights..."
                disabled={isLoading}
              />
              <SendButton onClick={handleSendMessage} disabled={isLoading}>
                <FiSend />
              </SendButton>
            </ChatInputWrapper>
          </ChatInputContainer>
        </ChatContainer>
        
        <Sidebar>
          <SampleQuestions onQuestionClick={handleSampleQuestion} />
          <ComprehensiveAnalytics />
        </Sidebar>
      </MainContent>
    </AppContainer>
  );
}

export default App;
