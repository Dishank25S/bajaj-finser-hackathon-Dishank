// Test script for the enhanced AI system
const { processQuery } = require('./client/src/api/chatApi.js');

async function testAI() {
  console.log('🤖 Testing Enhanced AI System\n');
  
  const testQueries = [
    "What was the revenue growth in Q1 FY25?",
    "Compare Bajaj Finance performance across quarters",
    "Tell me about digital transformation initiatives",
    "How is the company performing financially?",
    "What are the key highlights of FY25?"
  ];
  
  for (const query of testQueries) {
    console.log(`\n📝 Query: "${query}"`);
    console.log('⏳ Processing...\n');
    
    try {
      const result = await processQuery(query);
      
      if (result.success) {
        console.log(`✅ AI Response (Confidence: ${Math.round(result.data.confidence * 100)}%):`);
        console.log(`Intent: ${result.data.intent}`);
        console.log(`Entities: ${result.data.entities.join(', ')}`);
        console.log(`Timeframe: ${result.data.timeframe}`);
        console.log(`\n${result.data.response.substring(0, 200)}...`);
      } else {
        console.log('❌ Error:', result.error);
      }
    } catch (error) {
      console.log('❌ Test Error:', error.message);
    }
    
    console.log('\n' + '='.repeat(80));
  }
  
  console.log('\n🎉 AI System Testing Complete!');
}

// Run the test
testAI().catch(console.error);
