#!/usr/bin/env python3
"""
Bajaj Finserv AI Assistant - Query Engine
This script processes user queries using the pre-built vector index or fallback system
"""

import sys
import os
import json
from pathlib import Path

# Try to import AI libraries, fallback to basic system if not available
try:
    from llama_index.core import StorageContext, load_index_from_storage, Settings
    from llama_index.embeddings.huggingface import HuggingFaceEmbedding
    from llama_index.llms.ollama import Ollama
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False

def setup_models():
    """Configure LLM and embedding models"""
    if not AI_AVAILABLE:
        return False
        
    try:
        # Configure Ollama LLM
        llm = Ollama(model="mistral", request_timeout=60.0)
        
        # Configure HuggingFace embeddings
        embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")
        
        # Set global settings
        Settings.llm = llm
        Settings.embed_model = embed_model
        
        return True
    except Exception:
        return False

def load_index():
    """Load the pre-built vector index"""
    if not AI_AVAILABLE:
        return None
        
    try:
        storage_dir = "./storage"
        
        if not os.path.exists(storage_dir):
            return None
            
        # Load index from storage
        storage_context = StorageContext.from_defaults(persist_dir=storage_dir)
        index = load_index_from_storage(storage_context)
        
        return index
        
    except Exception:
        return None

def query_index(index, query_text):
    """Query the index and return response"""
    try:
        # Create query engine with custom settings
        query_engine = index.as_query_engine(
            response_mode="compact",
            similarity_top_k=3,
            streaming=False
        )
        
        # Add context to the query for better financial responses
        enhanced_query = f"""
        Based on Bajaj Finance's earnings call transcripts (Q1-Q4 FY25), please answer the following question:
        
        {query_text}
        
        Please provide specific data points, financial metrics, and management commentary where relevant.
        If the information is not available in the transcripts, please state that clearly.
        """
        
        # Execute query
        response = query_engine.query(enhanced_query)
        
        return str(response)
        
    except Exception as e:
        return f"Query processing error: {e}"

def generate_fallback_response(query):
    """Generate fallback responses based on real transcript content"""
    query_lower = query.lower()
    
    # Real data from Bajaj Finserv FY25 earnings transcripts
    transcript_responses = {
        'revenue': "Based on Bajaj Finserv's Q2 FY25 earnings call, consolidated revenue grew 30% for the quarter, reaching ₹33,703 crores. For the half year, revenue growth was 32% Y-o-Y. Bajaj Finance (BFL) subsidiary showed total income up 24% with 29% growth in AUM. The strong revenue performance was driven by growth across all business segments including insurance and lending.",
        
        'roe': "From Q2 FY25 results: Bajaj Finance achieved ROE of 19.08% (annualized) with ROTA of 4.48%. Bajaj Housing Finance delivered ROE of 13.03% with ROTA of 2.5%. BAGIC's ROE was around 12.3% in Q4 FY25. The stock broking business achieved ROE of 12.03%, showing strong profitability across all subsidiaries.",
        
        'aum': "Based on Q2 FY25 earnings: Bajaj Finance AUM grew 29% year-over-year. Bajaj Housing Finance AUM stood at ₹1,02,569 crores with 26% growth. Bajaj Allianz Life Insurance AUM reached ₹1,23,178 crores, up 25%. The asset management business AUM was close to ₹16,000 crores, demonstrating strong asset growth across the ecosystem.",
        
        'bagic': "BAGIC's Q2 FY25 performance: Despite headline GWP being down 20% due to government health business spillover, underlying growth was significantly above market at 11% (excluding crop and government health). Combined ratio was 101.4%, affected by NATCAT claims. Excluding these, combined ratio would have been 99.7%. Solvency margin strong at 312% vs regulatory norm of 150%.",
        
        'balic': "BALIC delivered market-beating growth in Q2 FY25: Individual rated new business grew 34% Y-o-Y. Market share increased to almost 9% of private sector vs 8% in Q2 FY24. BALIC ranked 6th among private players and 3rd on Retail NOPs. New Business Value grew 3% despite margin pressures from increased ULIP sales. Gross written premium was higher by 23% Y-o-Y.",
        
        'housing': "Bajaj Housing Finance Q2 FY25 results: AUM growth of 26% reaching ₹1,02,569 crores. Net total income grew 18% with profit after tax of ₹546 crores, up 21%. Credit performance exceptional with just 12 basis points net NPA and 29 basis points gross NPA. ROTA of 2.5% is satisfactory for low-risk, low-margin business with ROE of 13.03%.",
        
        'npa': "Asset quality remains excellent across subsidiaries: Bajaj Finance gross NPA at 1.06% and net NPA at 0.46% - among the best in industry. Bajaj Housing Finance has exceptional credit performance with gross NPA of just 29 basis points and net NPA of 12 basis points. Strong underwriting standards maintained across all lending businesses.",
        
        'health': "Bajaj Finserv Health Q2 FY25 update: Post-acquisition of Vidal Health, integration work commenced. Consolidated revenue for the quarter was ₹233 crores. As a pure healthtech start-up, this revenue level is encouraging. The integration of Vidal provides significant runway for growth. Profit after tax was negative ₹32 crores, well within planned expectations.",
        
        'broking': "Stock broking business (under Bajaj Finance) delivered exceptional Q2 FY25 performance: 78% growth in revenue from operations at ₹121 crores. Profit after tax surged 185% to ₹37 crores. AUM at ₹5,430 crores represents margin trade finance AUM. ROE of 12.03% achieved - this emerging business has reached comfortable profitability levels.",
        
        'allianz': "Regarding Allianz exit (Q2 FY25 call): Management disclosed that Allianz intimated they are considering exit from insurance joint ventures. No significant additional information available at that stage. Bajaj will continue to be dominant shareholder with 74% equity stake. Two solid insurance businesses built over several years will continue under Bajaj's leadership."
    }
    
    # Check for keyword matches and return relevant response
    for keyword, response in transcript_responses.items():
        if keyword in query_lower:
            return response
    
    # Default response
    return f"Based on Bajaj Finance's FY25 earnings transcripts, I can help you with information about financial performance, business segments, subsidiaries, and strategic initiatives. The company delivered strong results across all quarters with consistent growth in revenue, profitability, and asset quality. Please ask about specific metrics like ROE, AUM, revenue, or subsidiaries like BAGIC and Housing Finance."

def calculate_confidence(response_text, has_ai=False):
    """Calculate confidence score based on response characteristics"""
    try:
        if has_ai:
            if "not available" in response_text.lower() or "don't have" in response_text.lower():
                return 0.4
            elif len(response_text) < 50:
                return 0.6
            elif any(keyword in response_text.lower() for keyword in ['₹', 'crores', 'percent', '%', 'growth']):
                return 0.9
            else:
                return 0.8
        else:
            # Fallback confidence
            if any(keyword in response_text.lower() for keyword in ['₹', 'crores', 'percent', '%', 'growth']):
                return 0.7
            else:
                return 0.6
    except:
        return 0.5

def main():
    """Main function to process query"""
    try:
        # Get query from command line argument
        if len(sys.argv) < 2:
            print(json.dumps({
                "error": "No query provided",
                "message": "Please provide a query as a command line argument"
            }))
            sys.exit(1)
            
        query_text = " ".join(sys.argv[1:])
        
        # Try AI system first
        if AI_AVAILABLE and setup_models():
            index = load_index()
            if index is not None:
                try:
                    response = query_index(index, query_text)
                    confidence = calculate_confidence(response, has_ai=True)
                    
                    result = {
                        "response": response,
                        "confidence": confidence,
                        "query": query_text,
                        "source": "Bajaj Finance AI Assistant (Advanced)",
                        "mode": "ai"
                    }
                    
                    print(json.dumps(result))
                    return
                except Exception:
                    pass  # Fall through to fallback
        
        # Fallback to transcript-based responses
        response = generate_fallback_response(query_text)
        confidence = calculate_confidence(response, has_ai=False)
        
        result = {
            "response": response,
            "confidence": confidence,
            "query": query_text,
            "source": "Bajaj Finance AI Assistant (Transcript-based)",
            "mode": "fallback"
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({
            "error": f"Unexpected error: {e}",
            "message": "An unexpected error occurred while processing the query"
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()
