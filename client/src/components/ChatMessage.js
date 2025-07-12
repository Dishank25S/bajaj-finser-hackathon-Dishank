import React from 'react';
import styled from 'styled-components';
import { FiUser, FiMessageCircle } from 'react-icons/fi';

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-start;
  gap: 1rem;
  animation: fadeInUp 0.3s ease-out;
  font-family: 'Inter', sans-serif;
  ${props => props.isUser && `
    flex-direction: row-reverse;
  `}
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  ${props => props.isUser ? `
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
  ` : `
    background: linear-gradient(135deg, #003D7A 0%, #002952 100%);
  `}
`;

const MessageBubble = styled.div`
  max-width: 75%;
  padding: 1rem 1.25rem;
  border-radius: 20px;
  white-space: pre-wrap;
  line-height: 1.6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    max-width: 85%;
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    max-width: 90%;
    padding: 0.75rem 0.9rem;
    font-size: 0.9rem;
  }
  
  ${props => props.isUser ? `
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
    color: white;
    border-bottom-right-radius: 8px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #0056B3;
      border-left-color: #0056B3;
    }
  ` : `
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    color: #374151;
    border-bottom-left-radius: 8px;
    border: 1px solid #e2e8f0;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #ffffff;
      border-right-color: #ffffff;
    }
  `}
`;

const MessageMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  ${props => props.isUser && 'align-items: flex-end;'}
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
`;

const MessageStatus = styled.div`
  font-size: 0.75rem;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

function ChatMessage({ message }) {
  const isUser = message.type === 'user';
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <MessageContainer isUser={isUser}>
      <Avatar isUser={isUser}>
        {isUser ? <FiUser /> : <FiMessageCircle />}
      </Avatar>
      <div style={{ flex: 1 }}>
        <MessageBubble isUser={isUser}>
          {message.content}
        </MessageBubble>
        <MessageMeta isUser={isUser}>
          <Timestamp>
            {timestamp}
          </Timestamp>
          {isUser && (
            <MessageStatus>
              ✓ Sent
            </MessageStatus>
          )}
        </MessageMeta>
      </div>
    </MessageContainer>
  );
}

export default ChatMessage;
