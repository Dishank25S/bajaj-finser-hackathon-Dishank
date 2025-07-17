// Test script for Netlify function
// Run this locally to test the serverless function

const { handler } = require('./netlify/functions/chat.js');

async function testNetlifyFunction() {
  console.log('🧪 Testing Netlify Function...\n');

  const testQueries = [
    'What was the revenue performance in Q2 FY25?',
    'How did BAGIC perform?',
    'Tell me about Bajaj Housing Finance',
    'What about ROE and profitability?'
  ];

  for (const query of testQueries) {
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ message: query })
    };

    try {
      const result = await handler(event, {});
      const response = JSON.parse(result.body);
      
      console.log(`📊 Query: "${query}"`);
      console.log(`📈 Response: ${response.response.substring(0, 100)}...`);
      console.log(`🎯 Confidence: ${response.confidence}`);
      console.log(`📅 Source: ${response.source}\n`);
    } catch (error) {
      console.error(`❌ Error testing query: ${query}`, error);
    }
  }
}

// Only run if called directly
if (require.main === module) {
  testNetlifyFunction();
}

module.exports = { testNetlifyFunction };
