import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import ChatMessage from './components/ChatMessage';
import SampleQuestions from './components/SampleQuestions';
import ComprehensiveAnalytics from './components/ComprehensiveAnalytics';
import DetailedAnalytics from './components/DetailedAnalytics';
import { sendMessage } from './api/chatApi';

const AppContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
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
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  
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
      radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.12) 0%, transparent 40%);
    pointer-events: none;
    animation: breathe 8s ease-in-out infinite;
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
  
  @keyframes breathe {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.02);
    }
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.25);
  position: relative;
  z-index: 10;
  font-family: 'Inter', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.2) 0%, 
      rgba(0, 123, 255, 0.1) 50%, 
      rgba(255, 255, 255, 0.1) 100%);
    pointer-events: none;
    border-radius: inherit;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
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
      background: linear-gradient(90deg, #007BFF 0%, #FFD700 100%);
      border-radius: 1px;
      opacity: 0.6;
    }
    
    .brand-primary {
      color: #ffffff;
      -webkit-text-fill-color: #ffffff;
      font-weight: 900;
    }
    
    .brand-accent {
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
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
      background: linear-gradient(45deg, #00d4aa, #007BFF);
      box-shadow: 
        0 0 12px rgba(0, 123, 255, 0.6),
        0 0 24px rgba(0, 123, 255, 0.3);
      animation: gentlePulse 2.5s infinite ease-in-out;
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
    
    @keyframes gentlePulse {
      0%, 100% { 
        opacity: 1; 
        transform: scale(1); 
      }
      50% { 
        opacity: 0.8; 
        transform: scale(1.1); 
      }
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
      color: #FFD700;
      font-size: 1.1rem;
      filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3));
    }
    
    .ai-text {
      font-size: 0.85rem;
      font-weight: 600;
      color: #FFD700;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  grid-gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
  position: relative;
  z-index: 5;
  font-family: 'Inter', sans-serif;
  height: calc(100vh - 120px);
  min-height: 0;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1.5fr 1fr;
    padding: 0.875rem;
    gap: 0.875rem;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 0.8fr 0.8fr;
    padding: 0.75rem;
    gap: 0.75rem;
    height: calc(100vh - 100px);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
    height: calc(100vh - 90px);
    grid-template-rows: 2fr 0.7fr 0.7fr;
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem;
    gap: 0.25rem;
    height: calc(100vh - 80px);
    grid-template-rows: 2.5fr 0.6fr 0.6fr;
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
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    flex-direction: row;
    text-align: left;
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 85% 30%, rgba(0, 123, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 40%);
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
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
  }
  
  .chat-info h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  
  .chat-info p {
    margin: 0.25rem 0 0 0;
    opacity: 0.9;
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.98) 100%);
  font-family: 'Inter', sans-serif;
  min-height: 0;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0066CC 0%, #004799 100%);
    transform: scale(1.1);
  }
`;

const ChatInputContainer = styled.div`
  padding: 1rem 1.25rem;
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
    padding: 0.75rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const ChatInputWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 123, 255, 0.1);
  border-radius: 25px;
  padding: 0.5rem;
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.08),
    0 3px 8px rgba(0, 123, 255, 0.05),
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
      0 0 0 3px rgba(0, 123, 255, 0.1),
      0 8px 25px rgba(0, 0, 0, 0.1),
      0 6px 15px rgba(0, 123, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: rgba(0, 123, 255, 0.2);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.1),
      0 4px 12px rgba(0, 123, 255, 0.06),
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
    #0066CC 50%, 
    #0056B3 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 
    0 6px 20px rgba(0, 123, 255, 0.25),
    0 3px 10px rgba(0, 123, 255, 0.15);
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
      0 10px 25px rgba(0, 123, 255, 0.35),
      0 6px 16px rgba(0, 123, 255, 0.2);
    background: linear-gradient(135deg, 
      #0080FF 0%, 
      #007BFF 50%, 
      #0066CC 100%);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      transform: scale(1.1) rotate(10deg);
    }
  }
  
  &:active {
    transform: translateY(0) scale(1.02);
    box-shadow: 
      0 6px 16px rgba(0, 123, 255, 0.3),
      0 3px 8px rgba(0, 123, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 3px 8px rgba(230, 0, 126, 0.15);
    
    &:hover {
      transform: none;
      box-shadow: 0 3px 8px rgba(0, 123, 255, 0.15);
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
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
`;

const WelcomeMessage = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 182, 193, 0.05) 50%, 
    rgba(173, 216, 230, 0.05) 100%);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.08),
    0 5px 15px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 14px;
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
    background: linear-gradient(90deg, 
      #007BFF, 
      #0066CC, 
      #0056B3, 
      #004799);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    
    @media (max-width: 768px) {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
  }
  
  h3 {
    color: #007BFF;
    margin-bottom: 1.25rem;
    font-size: 1.75rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    color: #64748b;
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    
    @media (max-width: 768px) {
      font-size: 1rem;
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

const SampleQuestionsSection = styled.div`
  padding: 0.5rem;
  background: transparent;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  
  @media (max-width: 768px) {
    padding: 0.375rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem;
  }
`;

const AnalyticsSection = styled.div`
  background: transparent;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  min-height: 0;
  
  @media (max-width: 768px) {
    padding: 0.375rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem;
  }
`;

const Chat = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.9) 100%);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.08),
    0 15px 30px rgba(0, 123, 255, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(30px);
  font-family: 'Inter', sans-serif;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  min-height: 0;
  
  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.12),
      0 20px 40px rgba(0, 123, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      #007BFF 0%, 
      #0066CC 25%, 
      #0056B3 50%, 
      #004799 75%, 
      #007BFF 100%);
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }
  
  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 1;
    border-radius: 20px;
    
    &::before {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }
  
  @media (max-width: 768px) {
    border-radius: 18px;
    
    &::before {
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
    }
  }
`;

const BentoCard = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.7) 100%);
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.06),
    0 8px 16px rgba(0, 123, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(30px);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  min-height: 0;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.12),
      0 15px 30px rgba(0, 123, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 123, 255, 0.6) 20%, 
      rgba(0, 86, 179, 0.6) 50%, 
      rgba(0, 71, 153, 0.6) 80%, 
      transparent 100%);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
    
    &::before {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
  }
`;

const SampleQuestionsCard = styled(BentoCard)`
  grid-column: 2;
  grid-row: 1;
  
  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const AnalyticsCard = styled(BentoCard)`
  grid-column: 2;
  grid-row: 2;
  
  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 3;
  }
`;

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      console.log('Sending message:', userMessage);
      const response = await sendMessage(userMessage);
      console.log('Received response:', response);
      
      // Handle both direct response string and response object
      const botMessage = typeof response === 'string' ? response : response.response;
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: botMessage,
        confidence: response.confidence,
        source: response.source 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: `I apologize, but I'm having trouble connecting to my knowledge base right now. However, I can still help you with Bajaj Finserv queries! The company delivered strong Q2 FY25 results with 30% revenue growth. Please try asking about specific topics like revenue, BAGIC performance, Bajaj Housing Finance, or ROE metrics.`,
        error: true
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

  const handleSampleQuestion = async (question) => {
    if (isLoading) return;
    
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    setIsLoading(true);

    try {
      console.log('Sending sample question:', question);
      const response = await sendMessage(question);
      console.log('Received response:', response);
      
      // Handle both direct response string and response object
      const botMessage = typeof response === 'string' ? response : response.response;
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: botMessage,
        confidence: response.confidence,
        source: response.source 
      }]);
    } catch (error) {
      console.error('Sample question error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: `I apologize, but I'm having trouble connecting to my knowledge base right now. However, I can still help you with Bajaj Finserv queries! The company delivered strong Q2 FY25 results with 30% revenue growth. Please try asking about specific topics like revenue, BAGIC performance, Bajaj Housing Finance, or ROE metrics.`,
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowDetailedAnalytics = () => {
    setShowDetailedAnalytics(true);
  };

  const handleCloseDetailedAnalytics = () => {
    setShowDetailedAnalytics(false);
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
        <Chat>
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
              <WelcomeMessage>            <h3 style={{ color: '#007BFF', marginBottom: '1.25rem', fontFamily: 'Inter, sans-serif', fontSize: '1.75rem', fontWeight: '600', background: 'linear-gradient(135deg, #007BFF 0%, #0056B3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Welcome to Your Personal AI Financial Assistant
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1rem', fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', lineHeight: '1.7' }}>
              I'm here to help you understand Bajaj Finserv's financial performance with intelligent insights and contextual understanding. 
              Ask me anything about earnings, stock performance, or financial trends - I'll provide confident, well-sourced responses!
            </p>
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
        </Chat>
        
        <SampleQuestionsCard>
          <SampleQuestionsSection>
            <SampleQuestions onQuestionClick={handleSampleQuestion} />
          </SampleQuestionsSection>
        </SampleQuestionsCard>
        
        <AnalyticsCard>
          <AnalyticsSection>
            <ComprehensiveAnalytics onShowDetails={handleShowDetailedAnalytics} />
          </AnalyticsSection>
        </AnalyticsCard>
      </MainContent>
      
      <DetailedAnalytics 
        isOpen={showDetailedAnalytics} 
        onClose={handleCloseDetailedAnalytics} 
      />
    </AppContainer>
  );
}

export default App;
