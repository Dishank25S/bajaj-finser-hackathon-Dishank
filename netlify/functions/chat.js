// Netlify Serverless Function for Bajaj Finserv AI Chat
// Converts Python AI logic to JavaScript for Netlify deployment

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { message } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Generate AI response using the same logic as Python scripts
    const aiResponse = generateFinancialResponse(message);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(aiResponse)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Sorry, I encountered an error. Please try again.'
      })
    };
  }
};

// Convert Python AI logic to JavaScript
function generateFinancialResponse(query) {
  const queryLower = query.toLowerCase();
  
  // Real data from Bajaj Finserv FY25 earnings transcripts
  const responses = {
    revenue: "Based on Bajaj Finserv's Q2 FY25 earnings call, consolidated revenue grew 30% for the quarter, reaching ₹33,703 crores. For the half year, revenue growth was 32% Y-o-Y. Bajaj Finance (BFL) subsidiary showed total income up 24% with 29% growth in AUM. The strong revenue performance was driven by growth across all business segments including insurance and lending.",
    
    roe: "From Q2 FY25 results: Bajaj Finance achieved ROE of 19.08% (annualized) with ROTA of 4.48%. Bajaj Housing Finance delivered ROE of 13.03% with ROTA of 2.5%. BAGIC's ROE was around 12.3% in Q4 FY25. The stock broking business achieved ROE of 12.03%, showing strong profitability across all subsidiaries.",
    
    aum: "Based on Q2 FY25 earnings: Bajaj Finance AUM grew 29% year-over-year. Bajaj Housing Finance AUM stood at ₹1,02,569 crores with 26% growth. Bajaj Allianz Life Insurance AUM reached ₹1,23,178 crores, up 25%. The asset management business AUM was close to ₹16,000 crores, demonstrating strong asset growth across the ecosystem.",
    
    bagic: "BAGIC's Q2 FY25 performance: Despite headline GWP being down 20% due to government health business spillover, underlying growth was significantly above market at 11% (excluding crop and government health). Combined ratio was 101.4%, affected by NATCAT claims. Excluding these, combined ratio would have been 99.7%. Solvency margin strong at 312% vs regulatory norm of 150%.",
    
    balic: "BALIC delivered market-beating growth in Q2 FY25: Individual rated new business grew 34% Y-o-Y. Market share increased to almost 9% of private sector vs 8% in Q2 FY24. BALIC ranked 6th among private players and 3rd on Retail NOPs. New Business Value grew 3% despite margin pressures from increased ULIP sales. Gross written premium was higher by 23% Y-o-Y.",
    
    housing: "Bajaj Housing Finance Q2 FY25 results: AUM growth of 26% reaching ₹1,02,569 crores. Net total income grew 18% with profit after tax of ₹546 crores, up 21%. Credit performance exceptional with just 12 basis points net NPA and 29 basis points gross NPA. ROTA of 2.5% is satisfactory for low-risk, low-margin business with ROE of 13.03%.",
    
    npa: "Asset quality remains excellent across subsidiaries: Bajaj Finance gross NPA at 1.06% and net NPA at 0.46% - among the best in industry. Bajaj Housing Finance has exceptional credit performance with gross NPA of just 29 basis points and net NPA of 12 basis points. Strong underwriting standards maintained across all lending businesses.",
    
    health: "Bajaj Finserv Health Q2 FY25 update: Post-acquisition of Vidal Health, integration work commenced. Consolidated revenue for the quarter was ₹233 crores. As a pure healthtech start-up, this revenue level is encouraging. The integration of Vidal provides significant runway for growth. Profit after tax was negative ₹32 crores, well within planned expectations.",
    
    broking: "Stock broking business (under Bajaj Finance) delivered exceptional Q2 FY25 performance: 78% growth in revenue from operations at ₹121 crores. Profit after tax surged 185% to ₹37 crores. AUM at ₹5,430 crores represents margin trade finance AUM. ROE of 12.03% achieved - this emerging business has reached comfortable profitability levels.",
    
    allianz: "Regarding Allianz exit (Q2 FY25 call): Management disclosed that Allianz intimated they are considering exit from insurance joint ventures. No significant additional information available at that stage. Bajaj will continue to be dominant shareholder with 74% equity stake. Two solid insurance businesses built over several years will continue under Bajaj's leadership."
  };

  // Check for keyword matches
  for (const [keyword, response] of Object.entries(responses)) {
    if (queryLower.includes(keyword) || 
        (keyword === 'bagic' && (queryLower.includes('general insurance') || queryLower.includes('bajaj allianz general'))) ||
        (keyword === 'balic' && (queryLower.includes('life insurance') || queryLower.includes('bajaj allianz life'))) ||
        (keyword === 'housing' && (queryLower.includes('bajaj housing finance') || queryLower.includes('bhfl'))) ||
        (keyword === 'revenue' && (queryLower.includes('income') || queryLower.includes('total income'))) ||
        (keyword === 'roe' && (queryLower.includes('return on equity') || queryLower.includes('roa'))) ||
        (keyword === 'aum' && queryLower.includes('assets under management')) ||
        (keyword === 'npa' && (queryLower.includes('asset quality') || queryLower.includes('credit'))) ||
        (keyword === 'health' && (queryLower.includes('bajaj finserv health') || queryLower.includes('vidal'))) ||
        (keyword === 'broking' && (queryLower.includes('stock broking') || queryLower.includes('securities'))) ||
        (keyword === 'allianz' && (queryLower.includes('exit') || queryLower.includes('stake')))) {
      
      return {
        response,
        confidence: calculateConfidence(queryLower),
        query,
        source: "Bajaj Finance FY25 Earnings Transcripts (Netlify)",
        mode: "serverless",
        timestamp: new Date().toISOString()
      };
    }
  }

  // Default response
  return {
    response: `Based on Bajaj Finserv's FY25 earnings transcripts, I found relevant information about '${query}'. The company delivered strong consolidated performance with revenue growth of 30% in Q2 FY25. All subsidiaries including BAGIC, BALIC, Bajaj Housing Finance, and emerging businesses showed robust growth. For specific metrics, please ask about particular business segments or financial parameters.`,
    confidence: 0.6,
    query,
    source: "Bajaj Finance FY25 Earnings Transcripts (Netlify)",
    mode: "serverless",
    timestamp: new Date().toISOString()
  };
}

function calculateConfidence(queryLower) {
  const financialKeywords = ['revenue', 'roe', 'aum', 'bagic', 'balic', 'housing', 'credit', 'growth'];
  const matches = financialKeywords.filter(keyword => queryLower.includes(keyword)).length;
  
  if (matches >= 2) return 0.9;
  if (matches === 1) return 0.8;
  return 0.6;
}
