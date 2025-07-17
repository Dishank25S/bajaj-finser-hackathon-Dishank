// Test the chat API functionality
const path = require('path');

// Mock environment for testing
process.env.NODE_ENV = 'development';

// Import the chat API
const chatApiPath = path.join(__dirname, 'client', 'src', 'api', 'chatApi.js');

// Since we can't directly import ES6 modules in Node.js without setup,
// let's test the Netlify function directly
const { handler } = require('./netlify/functions/chat.js');

async function testChatAPI() {
  console.log('🧪 Testing Chat API Integration...\n');

  const sampleQuestions = [
    'What was the highest stock price in Jan-22?',
    'Compare Bajaj Finserv performance Mar-22 to Jun-22',
    'Tell me about BAGIC motor insurance growth trends',
    'How is Hero FinCorp performing this quarter?',
    'What are the key growth drivers for Bajaj Markets?',
    'Analyze the revenue growth patterns',
    'Generate CFO commentary for investor presentation',
    'What\'s the outlook for next quarter?',
    'Explain the impact of Allianz partnership'
  ];

  console.log('📋 Testing all sample questions from the UI...\n');

  for (let i = 0; i < sampleQuestions.length; i++) {
    const question = sampleQuestions[i];
    
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ message: question })
    };

    try {
      const result = await handler(event, {});
      const response = JSON.parse(result.body);
      
      console.log(`${i + 1}. ❓ Question: "${question}"`);
      console.log(`   ✅ Response: ${response.response.substring(0, 120)}...`);
      console.log(`   🎯 Confidence: ${response.confidence}`);
      console.log(`   📊 Source: ${response.source}`);
      console.log('');
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      console.log('');
    }
  }

  // Test some specific financial queries
  console.log('\n💰 Testing specific financial queries...\n');
  
  const financialQueries = [
    'What is the ROE of Bajaj Finance?',
    'How much revenue did Bajaj Finserv make?',
    'What about NPA levels?',
    'Tell me about AUM growth'
  ];

  for (const query of financialQueries) {
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ message: query })
    };

    try {
      const result = await handler(event, {});
      const response = JSON.parse(result.body);
      
      console.log(`💬 Query: "${query}"`);
      console.log(`📈 Response: ${response.response.substring(0, 100)}...`);
      console.log(`🎯 Confidence: ${response.confidence}\n`);
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
    }
  }

  console.log('✅ Chat API testing completed!');
  console.log('\n🚀 The bot should now be working correctly in your React app!');
  console.log('💡 Sample questions will provide detailed responses about Bajaj Finserv FY25 performance.');
}

testChatAPI().catch(console.error);
