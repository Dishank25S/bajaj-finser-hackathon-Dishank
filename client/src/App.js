import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import ChatMessage from './components/ChatMessage';
import SampleQuestions from './components/SampleQuestions';
import ComprehensiveAnalytics from './components/ComprehensiveAnalytics';
import { sendMessage } from './api/chatApi';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, 
    #007BFF 0%, 
    #0066CC 15%, 
    #0056B3 35%, 
    #004799 55%, 
    #003D7A 75%, 
    #003366 90%, 
    #002952 100%);
  position: relative;
  font-family: 'Poppins', 'Inter', sans-serif;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.2) 0%, transparent 40%),
      radial-gradient(circle at 85% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 45%),
      radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 35%),
      radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%);
    pointer-events: none;
    animation: backgroundShimmer 20s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    pointer-events: none;
    opacity: 0.4;
  }
  
  @keyframes backgroundShimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.12),
    0 4px 20px rgba(0, 123, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
  font-family: 'Poppins', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 50%, 
      rgba(0, 123, 255, 0.05) 100%);
    pointer-events: none;
    border-radius: inherit;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
  font-family: 'Poppins', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
    gap: 0.5rem;
  }
  
  .logo-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    padding: 10px;
    border-radius: 20px;
    box-shadow: 
      0 12px 32px rgba(0, 0, 0, 0.25),
      0 8px 20px rgba(0, 123, 255, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 
        0 16px 40px rgba(0, 0, 0, 0.3),
        0 12px 24px rgba(0, 123, 255, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.9),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    }
    
    &::before {
      content: '';
      position: absolute;
      inset: 3px;
      background: linear-gradient(135deg, #007BFF 0%, #0056B3 50%, #003D7A 100%);
      border-radius: 16px;
      z-index: -1;
      opacity: 0.1;
    }
    
    img {
      width: 36px;
      height: 36px;
      object-fit: contain;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
      transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
      padding: 8px;
      
      img {
        width: 32px;
        height: 32px;
      }
    }
    
    @media (max-width: 480px) {
      width: 42px;
      height: 42px;
      padding: 6px;
      
      img {
        width: 28px;
        height: 28px;
      }
    }
  }
  
  .logo-text {
    background: linear-gradient(135deg, #ffffff 0%, #f1f3f4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 800;
    letter-spacing: -0.02em;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #007BFF 0%, #0080FF 100%);
      border-radius: 1px;
      opacity: 0.6;
    }
    
    .brand-primary {
      color: #ffffff;
      -webkit-text-fill-color: #ffffff;
      font-weight: 900;
    }
    
    .brand-accent {
      background: linear-gradient(135deg, #0080FF 0%, #007BFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
      margin-left: 0.25rem;
    }
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.12);
    padding: 0.75rem 1.25rem;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 100%);
      transition: left 0.5s ease;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.18);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      
      &::before {
        left: 100%;
      }
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #007BFF;
      box-shadow: 
        0 0 15px rgba(0, 212, 170, 0.8),
        0 0 30px rgba(0, 212, 170, 0.4);
      animation: statusPulse 2s infinite;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        inset: -3px;
        border: 2px solid rgba(0, 212, 170, 0.3);
        border-radius: 50%;
        animation: statusRipple 2s infinite;
      }
    }
    
    @keyframes statusPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.1); }
    }
    
    @keyframes statusRipple {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(2); opacity: 0; }
    }
  }
  
  .ai-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 215, 0, 0.12);
    padding: 0.75rem 1.25rem;
    border-radius: 30px;
    border: 1px solid rgba(255, 215, 0, 0.25);
    backdrop-filter: blur(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 215, 0, 0.1) 50%, 
        transparent 100%);
      transition: left 0.5s ease;
    }
    
    &:hover {
      background: rgba(255, 215, 0, 0.18);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
      
      &::before {
        left: 100%;
      }
    }
    
    .ai-icon {
      color: #007BFF;
      font-size: 1.1rem;
      filter: drop-shadow(0 2px 4px rgba(0, 123, 255, 0.3));
    }
    
    .ai-text {
      font-size: 0.85rem;
      font-weight: 600;
      color: #007BFF;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28px;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.12),
    0 16px 32px rgba(0, 123, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(30px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 123, 255, 0.4) 20%, 
      rgba(255, 215, 0, 0.4) 50%, 
      rgba(0, 123, 255, 0.4) 80%, 
      transparent 100%);
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 40px 80px rgba(0, 0, 0, 0.15),
      0 20px 40px rgba(0, 123, 255, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, 
    #007BFF 0%, 
    #0066CC 25%, 
    #0056B3 50%, 
    #004799 75%, 
    #003D7A 100%);
  color: white;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 90% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 90%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="15" cy="15" r="1.5" fill="rgba(255,255,255,0.15)" opacity="0.8"/><circle cx="85" cy="25" r="1" fill="rgba(255,215,0,0.2)" opacity="0.6"/><circle cx="25" cy="85" r="0.8" fill="rgba(255,255,255,0.1)" opacity="0.7"/><circle cx="75" cy="75" r="1.2" fill="rgba(255,255,255,0.12)" opacity="0.5"/></svg>');
    pointer-events: none;
    opacity: 0.6;
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
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0066CC 0%, #004799 100%);
  }
`;

const ChatInputContainer = styled.div`
  padding: 2rem;
  border-top: 1px solid rgba(0, 123, 255, 0.1);
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(248, 250, 252, 0.95) 50%, 
    rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px);
  font-family: 'Inter', sans-serif;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 123, 255, 0.3) 20%, 
      rgba(255, 215, 0, 0.3) 50%, 
      rgba(0, 123, 255, 0.3) 80%, 
      transparent 100%);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ChatInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 123, 255, 0.1);
  border-radius: 30px;
  padding: 0.75rem;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 123, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 123, 255, 0.02) 0%, 
      rgba(255, 215, 0, 0.02) 50%, 
      rgba(0, 123, 255, 0.02) 100%);
    pointer-events: none;
  }
  
  &:focus-within {
    border-color: rgba(0, 123, 255, 0.3);
    box-shadow: 
      0 0 0 4px rgba(0, 123, 255, 0.1),
      0 12px 30px rgba(0, 0, 0, 0.1),
      0 8px 20px rgba(0, 123, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
  }
  
  &:hover {
    border-color: rgba(0, 123, 255, 0.2);
    box-shadow: 
      0 10px 28px rgba(0, 0, 0, 0.1),
      0 6px 16px rgba(0, 123, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 25px;
  outline: none;
  font-size: 1rem;
  background: transparent;
  color: #374151;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.8rem 1rem;
  }
  
  &::placeholder {
    color: #9ca3af;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
  
  &:focus {
    color: #1f2937;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, 
    #007BFF 0%, 
    #0066CC 25%, 
    #0056B3 75%, 
    #004799 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 20px rgba(0, 123, 255, 0.25),
    0 4px 12px rgba(0, 123, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.2) 0%, 
      transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 12px 30px rgba(0, 123, 255, 0.35),
      0 8px 20px rgba(0, 123, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, 
      #0080FF 0%, 
      #007BFF 25%, 
      #0066CC 75%, 
      #0056B3 100%);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      transform: scale(1.1);
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 
      0 8px 20px rgba(0, 123, 255, 0.3),
      0 4px 12px rgba(0, 123, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 12px rgba(230, 0, 126, 0.15);
    
    &:hover {
      transform: none;
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
      background: linear-gradient(135deg, 
        #007BFF 0%, 
        #0066CC 25%, 
        #0056B3 75%, 
        #004799 100%);
      
      &::before {
        opacity: 0;
      }
      
      svg {
        transform: none;
      }
    }
  }
  
  svg {
    width: 22px;
    height: 22px;
    transition: transform 0.3s ease;
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
    background: linear-gradient(90deg, #007BFF, #0056B3, #003D7A);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    
    @media (max-width: 768px) {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
  }
  
  h3 {
    color: #007BFF;
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
        border-color: #007BFF;
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
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
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
            <img src="/bajaj-finance-app-icon.svg" alt="Bajaj Finance" />
          </div>
          <div className="logo-text">
            <div className="brand-primary">Bajaj Finserv</div>
            <div className="brand-accent">AI Assistant</div>
          </div>
        </Logo>
        <HeaderInfo>
          <div className="status-indicator">
            <div className="status-dot"></div>
            AI-Powered
          </div>
          <div className="ai-info">
            <FiTrendingUp className="ai-icon" />
            <span className="ai-text">Live Analytics</span>
          </div>
        </HeaderInfo>
      </Header>
      
      <MainContent>
        <ChatContainer>
          <ChatHeader>
            <div className="chat-icon">
              <FiMessageCircle size={28} />
            </div>
            <div className="chat-info">
              <h3>Advanced AI Financial Assistant</h3>
              <p>Trained on financial data with intelligent context understanding</p>
            </div>
          </ChatHeader>
          
          <ChatMessages>
            {messages.length === 0 && (
              <WelcomeMessage>
                <h3 style={{ color: '#007BFF', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                  Welcome to Advanced AI-Powered Financial Assistant
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                  I'm trained on Bajaj Finserv's financial data and can provide intelligent insights with contextual understanding. 
                  I learn from our conversations and provide confidence-scored responses with source attribution.
                </p>
                <ul style={{ textAlign: 'left', color: '#6b7280', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
                  <li>• Intelligent stock price analysis and predictions</li>
                  <li>• Contextual earnings insights and trend analysis</li>
                  <li>• Business intelligence for subsidiaries (BAGIC, Hero FinCorp)</li>
                  <li>• AI-generated CFO commentary and financial reports</li>
                  <li>• Comparative analysis with confidence scoring</li>
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
