# Bajaj Finserv AI Chatbot 🚀

**A comprehensive AI-powered financial intelligence platform for Bajaj Finserv analysis**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Features

### 📊 **Advanced Financial Analysis**
- **Comprehensive Stock Analysis**: Historical data from Jan 2022 - July 2025 (942+ data points)
- **Quarterly Performance Tracking**: Q1, Q3, Q4 FY25 earnings data
- **Period Comparisons**: Advanced date range analysis with percentage changes
- **Real-time Visualizations**: Interactive charts and graphs

### 🤖 **AI-Powered Intelligence**
- **Natural Language Processing**: Understands complex financial queries
- **Business Intelligence**: Deep insights into BAGIC, Hero partnership, Allianz stake sale
- **CFO-Level Commentary**: Professional investor call draft generation
- **Contextual Responses**: Smart query understanding and relevant information extraction

### 💼 **Business Insights**
- **Motor Insurance Analysis**: BAGIC headwinds and market challenges
- **Partnership Intelligence**: Hero MotoCorp strategic collaboration details
- **Corporate Actions**: Allianz stake sale timeline and valuation
- **Digital Growth**: Bajaj Markets organic traffic success metrics

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Modern, professional interface
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Interactive Elements**: Smooth animations and transitions
- **Dark/Light Themes**: Professional color schemes

## Tech Stack 🛠️

### Frontend
- React 18
- Styled Components
- Recharts for data visualization
- React Icons
- Axios for API calls

### Backend
- Node.js with Express
- CSV parsing for stock data
- Text analysis for earnings transcripts
- CORS enabled for frontend communication

## 🚀 Quick Start

### Option 1: One-Click Launcher (Recommended)
```bash
# Double-click the launcher file
start-app.bat
```
This will automatically:
- Start the backend server (Port 5000)
- Launch the frontend app (Port 3000)  
- Open the test page for verification
- Display all relevant URLs

### Option 2: Manual Setup
1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Start Backend** (Terminal 1)
   ```bash
   cd server
   node index.js
   ```
   ✅ Look for: "Loaded 942 stock price records" and "Server running on port 5000"

3. **Start Frontend** (Terminal 2)
   ```bash
   cd client  
   npm start
   ```
   ✅ Browser opens automatically at http://localhost:3000

### 📱 Access Points
- **Main Application**: http://localhost:3000
- **API Health Check**: http://localhost:5000/api/health
- **Test Interface**: Open `test.html` in browser

## Usage Examples 💡

Try asking these questions to the chatbot:

### Stock Price Queries
- "What was the highest stock price in Jan-22?"
- "What was the average stock price across Dec-24?"
- "Tell me the lowest stock price in Mar-25"

### Comparison Queries
- "Compare Bajaj Finserv from Jan-22 to Jun-22"
- "Compare performance from Mar-24 to Dec-24"

### Business Intelligence
- "Tell me something about organic traffic of Bajaj Markets"
- "Why is BAGIC facing headwinds in Motor insurance business?"
- "What's the rationale of Hero partnership?"
- "Give me table with dates explaining discussions regarding Allianz stake sale"

### CFO Commentary
- "Act as a CFO of BAGIC and help me draft commentary for upcoming investor call"

## Data Sources 📊

- **Stock Price Data**: Historical BFS share prices from Jan 2022 to July 2025
- **Earnings Transcripts**: Q4 FY25 earnings call transcript with key highlights
- **Real-time Chart**: Recent 30-day performance visualization

## API Endpoints 🔌

### Chat API
- `POST /api/chat` - Send a message to the chatbot
- `GET /api/health` - Health check endpoint

### Stock Data API
- `GET /api/stock-price/stats?startDate&endDate` - Get stock statistics for a period
- `GET /api/stock-price/compare` - Compare two time periods

## Project Structure 📁

```
bajaj-finser-hackathon-Dishank/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/           # API integration
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── data/             # Stock data and transcripts
│   ├── index.js          # Main server file
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## Features in Detail 🔍

### Intelligent Query Processing
The chatbot uses advanced text analysis to:
- Extract date patterns from natural language queries
- Identify stock price-related questions
- Match business intelligence queries with relevant transcript sections
- Provide contextual responses based on user intent

### Stock Data Analysis
- Calculates highest, lowest, and average prices for any date range
- Computes percentage changes and performance metrics
- Supports flexible date format recognition (MMM-YY)

### Earnings Transcript Analysis
- Searches through earnings call transcripts for relevant information
- Provides context-aware responses about business segments
- Extracts key insights about partnerships, challenges, and opportunities

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License 📄

MIT License - feel free to use this project for your own purposes.

## Support 💬

For questions or support, please open an issue in the GitHub repository.
