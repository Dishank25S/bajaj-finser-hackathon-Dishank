# Enhanced AI Training Data Management System

## Overview
This system allows you to easily add new training data to enhance the AI chatbot's knowledge and responses. The AI now features intelligent fallback responses and enhanced user guidance when it cannot answer specific queries.

## 🚀 New Enhanced Features

### Smart Fallback Response System
When the AI cannot answer a query, it now provides:
- **Context-aware suggestions** based on query type
- **Structured guidance** with relevant sample questions
- **Professional, helpful responses** instead of generic "I don't know" messages
- **Query refinement tips** to help users get better results

### Example Enhanced Fallback Response:
```
I don't have specific stock price information for your query. However, I can help you with:

📈 **Stock Analysis I Can Provide:**
• Historical price trends and patterns
• Highest/lowest prices in specific periods
• Price performance comparisons
• Trading volume analysis

**Try asking:** 'What was the highest stock price in 2024?' or 'Show me price trends for the last quarter'
```

## 💡 Enhanced AI Response Features

### Intelligent Fallback Responses
The AI now provides smart, context-aware responses when it cannot answer specific queries:

#### Query-Specific Guidance:
- **Stock Price Queries**: Suggests historical analysis options and available data periods
- **Financial Metrics**: Recommends specific performance indicators and timeframes
- **Insurance Business**: Guides users to BAGIC/BALIC specific insights
- **Comparisons**: Suggests types of comparisons available in the dataset

#### Professional Response Format:
```
Response Structure:
• Clear explanation of why the specific query cannot be answered
• Structured list of available alternatives with emojis for visual appeal
• Specific example questions the user can try
• Professional, helpful tone throughout
```

### New Training Data Added:
- **Extended Stock Data**: `BFS_Share_Price_Latest.csv` - Stock prices through July 2025
- **Quarterly Results**: `bajaj_finserv_quarterly_results.csv` - 5+ years of financial performance
- **Business Overview**: `bajaj_finserv_business_overview.json` - Comprehensive company data
- **Complete Transcripts**: Enhanced Q1 and Q2 FY25 earnings call transcripts
- **Peer Comparison**: `financial_sector_peer_comparison.csv` - Industry benchmark data

### Testing Enhanced Responses:
Try these sample queries to test the enhanced fallback system:
1. "What will the stock price be next month?" (Future prediction - should trigger fallback)
2. "Tell me about cryptocurrency" (Out of scope - should provide guidance)
3. "How is the company doing?" (Vague query - should suggest specific metrics)

## Supported Data Types

### 1. Stock Price Data (CSV)
- **File format:** CSV with columns: Date, Close Price, Volume (optional)
- **Location:** `server/data/`
- **Naming convention:** `*price*.csv` or `*stock*.csv`
- **Example:** `BFS_Share_Price_Q2_FY25.csv`

### 2. Earnings Transcripts (TXT)
- **File format:** Plain text files
- **Location:** `server/data/`
- **Naming convention:** `*transcript*.txt` or `*earnings*.txt`
- **Example:** `earnings_transcript_Q2_FY25.txt`

### 3. Financial Reports (JSON)
- **File format:** Structured JSON data
- **Location:** `server/data/`
- **Naming convention:** `*financial*.json` or `*report*.json`
- **Example:** `financial_report_Q2_FY25.json`

### 4. Business Documents (TXT)
- **File format:** Plain text files
- **Location:** `server/data/`
- **Naming convention:** Any `.txt` file
- **Example:** `business_insights_Q2_FY25.txt`

## How to Add New Training Data

### Method 1: Direct File Addition

1. **Add files to the data directory:**
   ```
   server/data/
   ├── BFS_Share_Price.csv (existing)
   ├── earnings_transcript.txt (existing)
   ├── NEW_DATA_FILE.csv (your new file)
   └── NEW_TRANSCRIPT.txt (your new file)
   ```

2. **Restart the server:**
   ```bash
   cd server
   npm run dev
   ```

3. **The AI will automatically detect and process new files**

### Method 2: API-Based Training (Advanced)

Add an endpoint to retrain the AI without restart:

```javascript
// POST /api/retrain
// Body: { dataPath: "path/to/new/data" }
```

## Data Format Examples

### Stock Price CSV Format:
```csv
Date,Close Price,Volume
01-Jan-23,1850.50,1000000
02-Jan-23,1855.75,1200000
```

### Earnings Transcript Format:
```text
MANAGEMENT DISCUSSION AND ANALYSIS

Revenue Performance:
Our total revenue for Q2 FY25 increased by 15% compared to the previous quarter...

BAGIC Performance:
BAGIC motor insurance segment showed strong growth with 20% increase in premiums...

Financial Metrics:
- AUM grew by 12% to Rs. 50,000 crores
- EBITDA margin improved to 18%
- ROE stands at 22%
```

### Financial Report JSON Format:
```json
{
  "quarter": "Q2_FY25",
  "revenue": {
    "total": 5000,
    "growth_percent": 15,
    "currency": "crores"
  },
  "subsidiaries": {
    "BAGIC": {
      "revenue": 1200,
      "growth": 20
    },
    "Hero_FinCorp": {
      "revenue": 800,
      "growth": 10
    }
  },
  "metrics": {
    "AUM": 50000,
    "EBITDA_margin": 18,
    "ROE": 22
  }
}
```

## Training Data Guidelines

### Best Practices:

1. **Use consistent naming conventions**
2. **Include date/quarter information in filenames**
3. **Keep files organized by type**
4. **Use clear, descriptive content**
5. **Include financial metrics with units**

### Data Quality Tips:

1. **Be specific with numbers:**
   - ✅ "Revenue increased by 15% to Rs. 5,000 crores"
   - ❌ "Revenue went up significantly"

2. **Include context:**
   - ✅ "BAGIC motor insurance premiums grew 20% in Q2 FY25"
   - ❌ "BAGIC did well"

3. **Use standard financial terms:**
   - AUM, EBITDA, ROE, NII, GNPA, Credit Cost
   - Include subsidiary names: BAGIC, Hero FinCorp, Allianz, Bajaj Markets

## Automatic Processing

The AI system automatically:

1. **Detects new files** on server startup
2. **Categorizes data** by type and content
3. **Extracts insights** from financial information
4. **Builds knowledge graphs** for relationships
5. **Creates semantic embeddings** for similarity matching

## Monitoring Training

Check the server logs for training progress:

```
Starting AI training process...
Processing BFS_Share_Price.csv (stock_data)
Processing earnings_transcript.txt (earnings_transcript)
Processing new_financial_data.json (structured_data)
Building knowledge graph...
Creating semantic embeddings...
AI training completed with 1,247 data points
```

## API Endpoints for Data Management

### Get Training Status:
```bash
GET /api/training-status
```

### Add New Data:
```bash
POST /api/add-training-data
Content-Type: multipart/form-data

# Upload files directly
```

### Retrain AI:
```bash
POST /api/retrain
```

## File Size Limits

- **CSV files:** Up to 10MB
- **Text files:** Up to 5MB
- **JSON files:** Up to 2MB

## Troubleshooting

### Common Issues:

1. **File not detected:**
   - Check filename follows naming convention
   - Ensure file is in correct directory
   - Restart server to trigger re-training

2. **Poor AI responses:**
   - Add more specific training data
   - Include more context in text files
   - Use standard financial terminology

3. **Training errors:**
   - Check file format and encoding
   - Ensure CSV has proper headers
   - Validate JSON structure

## Advanced Features

### Incremental Training:
The system supports adding new data without losing existing knowledge.

### Context Awareness:
The AI maintains conversation history and learns from user interactions.

### Confidence Scoring:
Each response includes a confidence score based on training data relevance.

### Source Attribution:
Responses include references to source data for transparency.

## Future Enhancements

1. **PDF document processing**
2. **Real-time data feeds**
3. **Custom training workflows**
4. **Data validation and cleaning**
5. **Performance analytics**

## Getting Started

1. **Prepare your data** following the format guidelines
2. **Add files** to the `server/data/` directory
3. **Restart the server** to trigger training
4. **Test the chatbot** with relevant questions
5. **Monitor responses** and add more data as needed

Your AI chatbot will become more intelligent and accurate as you add more high-quality training data!
