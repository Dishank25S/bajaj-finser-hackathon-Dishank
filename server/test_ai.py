#!/usr/bin/env python3
"""
Simple test script for Bajaj Finserv AI Assistant
Tests the basic functionality without requiring full AI setup
"""

import sys
import json
import os

def test_basic_functionality():
    """Test basic script functionality"""
    print("🧪 Testing Bajaj Finserv AI Assistant Query System")
    
    # Simulate AI response for testing
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        
        # Simple keyword-based response for testing
        response_text = generate_test_response(query)
        confidence = calculate_test_confidence(query)
        
        result = {
            "response": response_text,
            "confidence": confidence,
            "query": query,
            "source": "Bajaj Finance FY25 Earnings Transcripts (Test Mode)",
            "mode": "test"
        }
        
        print(json.dumps(result))
    else:
        print(json.dumps({
            "error": "No query provided",
            "message": "Please provide a query as a command line argument"
        }))

def generate_test_response(query):
    """Generate test responses based on keywords from real Bajaj Finserv earnings transcripts"""
    query_lower = query.lower()
    
    if any(word in query_lower for word in ['revenue', 'income', 'total income']):
        return "Based on Bajaj Finserv's Q2 FY25 earnings call, consolidated revenue grew 30% for the quarter, reaching ₹33,703 crores. For the half year, revenue growth was 32% Y-o-Y. Bajaj Finance (BFL) subsidiary showed total income up 24% with 29% growth in AUM. The strong revenue performance was driven by growth across all business segments including insurance and lending."
    
    elif any(word in query_lower for word in ['roe', 'return on equity', 'roa']):
        return "From Q2 FY25 results: Bajaj Finance achieved ROE of 19.08% (annualized) with ROTA of 4.48%. Bajaj Housing Finance delivered ROE of 13.03% with ROTA of 2.5%. BAGIC's ROE was around 12.3% in Q4 FY25. The stock broking business achieved ROE of 12.03%, showing strong profitability across all subsidiaries."
    
    elif any(word in query_lower for word in ['aum', 'assets under management']):
        return "Based on Q2 FY25 earnings: Bajaj Finance AUM grew 29% year-over-year. Bajaj Housing Finance AUM stood at ₹1,02,569 crores with 26% growth. Bajaj Allianz Life Insurance AUM reached ₹1,23,178 crores, up 25%. The asset management business AUM was close to ₹16,000 crores, demonstrating strong asset growth across the ecosystem."
    
    elif any(word in query_lower for word in ['bagic', 'bajaj allianz general insurance', 'general insurance']):
        return "BAGIC's Q2 FY25 performance: Despite headline GWP being down 20% due to government health business spillover, underlying growth was significantly above market at 11% (excluding crop and government health). Combined ratio was 101.4%, affected by NATCAT claims. Excluding these, combined ratio would have been 99.7%. Solvency margin strong at 312% vs regulatory norm of 150%."
    
    elif any(word in query_lower for word in ['balic', 'bajaj allianz life insurance', 'life insurance']):
        return "BALIC delivered market-beating growth in Q2 FY25: Individual rated new business grew 34% Y-o-Y. Market share increased to almost 9% of private sector vs 8% in Q2 FY24. BALIC ranked 6th among private players and 3rd on Retail NOPs. New Business Value grew 3% despite margin pressures from increased ULIP sales. Gross written premium was higher by 23% Y-o-Y."
    
    elif any(word in query_lower for word in ['housing', 'bajaj housing finance', 'bhfl']):
        return "Bajaj Housing Finance Q2 FY25 results: AUM growth of 26% reaching ₹1,02,569 crores. Net total income grew 18% with profit after tax of ₹546 crores, up 21%. Credit performance exceptional with just 12 basis points net NPA and 29 basis points gross NPA. ROTA of 2.5% is satisfactory for low-risk, low-margin business with ROE of 13.03%."
    
    elif any(word in query_lower for word in ['npa', 'asset quality', 'credit']):
        return "Asset quality remains excellent across subsidiaries: Bajaj Finance gross NPA at 1.06% and net NPA at 0.46% - among the best in industry. Bajaj Housing Finance has exceptional credit performance with gross NPA of just 29 basis points and net NPA of 12 basis points. Strong underwriting standards maintained across all lending businesses."
    
    elif any(word in query_lower for word in ['health', 'bajaj finserv health', 'vidal']):
        return "Bajaj Finserv Health Q2 FY25 update: Post-acquisition of Vidal Health, integration work commenced. Consolidated revenue for the quarter was ₹233 crores. As a pure healthtech start-up, this revenue level is encouraging. The integration of Vidal provides significant runway for growth. Profit after tax was negative ₹32 crores, well within planned expectations."
    
    elif any(word in query_lower for word in ['direct', 'marketplace', 'bajaj finserv direct']):
        return "Bajaj Finserv Direct Q2 FY25: The marketplace and tech services business registered 30% growth in revenue from operations. Profit after tax improved significantly - loss reduced to just ₹6 crores for the quarter vs ₹18 crores loss in same quarter previous year, showing strong progress toward profitability."
    
    elif any(word in query_lower for word in ['broking', 'stock broking', 'securities']):
        return "Stock broking business (under Bajaj Finance) delivered exceptional Q2 FY25 performance: 78% growth in revenue from operations at ₹121 crores. Profit after tax surged 185% to ₹37 crores. AUM at ₹5,430 crores represents margin trade finance AUM. ROE of 12.03% achieved - this emerging business has reached comfortable profitability levels."
    
    elif any(word in query_lower for word in ['allianz', 'exit', 'stake']):
        return "Regarding Allianz exit (Q2 FY25 call): Management disclosed that Allianz intimated they are considering exit from insurance joint ventures. No significant additional information available at that stage. Bajaj will continue to be dominant shareholder with 74% equity stake. Two solid insurance businesses built over several years will continue under Bajaj's leadership."
    
    else:
        return f"Based on Bajaj Finserv's FY25 earnings transcripts, I found relevant information about '{query}'. The company delivered strong consolidated performance with revenue growth of 30% in Q2 FY25. All subsidiaries including BAGIC, BALIC, Bajaj Housing Finance, and emerging businesses showed robust growth. For specific metrics, please ask about particular business segments or financial parameters."

def calculate_test_confidence(query):
    """Calculate confidence based on query keywords"""
    financial_keywords = ['revenue', 'roe', 'aum', 'nim', 'bagic', 'housing', 'credit', 'growth']
    query_lower = query.lower()
    
    matches = sum(1 for keyword in financial_keywords if keyword in query_lower)
    
    if matches >= 2:
        return 0.9
    elif matches == 1:
        return 0.8
    else:
        return 0.6

if __name__ == "__main__":
    test_basic_functionality()
