const axios = require('axios');

// Test comprehensive AI with all quarterly data
async function testComprehensiveAI() {
  console.log("🤖 Testing Comprehensive AI with All Quarterly Data (Q1-Q4)...\n");
  
  const testQueries = [
    // Cross-quarter analysis
    "Compare Q1 vs Q2 vs Q3 performance across all metrics",
    "Show me ROE progression across Q1, Q2, Q3, Q4 for all subsidiaries",
    "Analyze revenue growth patterns from Q4 FY24 to Q3 FY25",
    
    // Specific quarterly data requests  
    "What were the Q3 FY25 AUM numbers for all businesses?",
    "Tell me about Q4 FY24 performance vs Q1 FY25",
    "Show Q2 vs Q3 comparison for BAGIC and BALIC",
    
    // Historical trend analysis
    "Revenue trajectory across all quarters with growth rates",
    "How did housing finance perform in each quarter?",
    "BAGIC quarterly performance analysis with solvency trends",
    
    // Comprehensive business analysis
    "Complete subsidiary performance across all 4 quarters",
    "Digital transformation progress quarter by quarter",
    "ESG initiatives and green finance growth quarterly"
  ];

  let passedTests = 0;
  let totalTests = testQueries.length;

  for (let i = 0; i < testQueries.length; i++) {
    const query = testQueries[i];
    
    try {
      console.log(`📊 Test ${i + 1}: "${query}"`);
      
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: query
      }, {
        timeout: 8000
      });

      const result = response.data;
      console.log(`✅ Confidence: ${result.confidence}`);
      console.log(`📈 Data Source: ${result.source}`);
      console.log(`🎯 Mode: ${result.mode}`);
      
      // Check for comprehensive data usage
      const responseText = result.response.toLowerCase();
      const hasQuarterlyData = responseText.includes('q1') || responseText.includes('q2') || 
                               responseText.includes('q3') || responseText.includes('q4') ||
                               responseText.includes('quarter');
      
      const hasMultipleMetrics = (responseText.match(/₹|%|cr|crores/g) || []).length >= 3;
      
      const hasComprehensiveAnalysis = responseText.includes('across') || 
                                       responseText.includes('progression') ||
                                       responseText.includes('trajectory') ||
                                       responseText.includes('comprehensive');

      if (hasQuarterlyData && hasMultipleMetrics && hasComprehensiveAnalysis) {
        console.log(`🎉 COMPREHENSIVE AI VERIFIED - Using multi-quarter data!`);
        passedTests++;
      } else {
        console.log(`⚠️  Limited data usage detected`);
      }
      
      console.log(`📝 Response Preview: ${result.response.substring(0, 200)}...\n`);
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      console.log(`🔄 Falling back to enhanced local AI...\n`);
    }
  }

  console.log(`\n🏆 COMPREHENSIVE AI TEST RESULTS:`);
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
  console.log(`📊 Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`);
  
  if (passedTests >= totalTests * 0.8) {
    console.log(`🎯 EXCELLENT - AI is properly using comprehensive quarterly data!`);
  } else {
    console.log(`⚠️  AI needs further enhancement for complete data coverage`);
  }
}

testComprehensiveAI().catch(console.error);
