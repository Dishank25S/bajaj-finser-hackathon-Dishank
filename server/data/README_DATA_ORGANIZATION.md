# Data Organization Guide for Bajaj Finserv AI Assistant

## 📁 Current Data Structure

Your project now supports **multiple data sources** for the AI assistant:

### **Primary Data Locations:**

1. **`/server/transcripts/`** - For PDF/Text Documents (AI Processing)
   - Earnings call transcripts
   - Management presentations  
   - Annual reports
   - Investor presentations

2. **`/server/data/`** - For Structured Data (CSV/JSON)
   - Financial metrics
   - Share price data
   - Quarterly results
   - Peer comparisons

## 📊 Existing Structured Data

Your `/server/data/` folder already contains:

```
├── bajaj_finserv_business_overview.json
├── bajaj_finserv_quarterly_results.csv
├── BFS_Share_Price.csv
├── BFS_Share_Price_Extended.csv
├── BFS_Share_Price_Latest.csv
├── earnings_transcript.txt
├── financial_sector_peer_comparison.csv
├── Q1_FY25_complete_earnings_transcript.txt
├── Q1_FY25_earnings_transcript.txt
└── Q2_FY25_earnings_transcript.txt
```

## 🔄 How to Add Your Real Dataset

### **For PDF/Text Documents:**
```
📁 /server/transcripts/
├── Q1_FY25_Earnings_Call.txt          ← Replace with real data
├── Q2_FY25_Earnings_Call.txt          ← Replace with real data
├── Q3_FY25_Earnings_Call.txt          ← Replace with real data
├── Q4_FY25_Earnings_Call.txt          ← Replace with real data
├── Annual_Report_2024.pdf             ← Add new files
├── Investor_Presentation_Q1.pdf       ← Add new files
└── Management_Discussion_2024.txt     ← Add new files
```

### **For CSV/JSON Data:**
```
📁 /server/data/
├── bajaj_finserv_quarterly_results.csv    ← Update with latest data
├── BFS_Share_Price_Latest.csv             ← Update with latest data
├── financial_metrics_2024.json           ← Add new structured data
├── loan_portfolio_analysis.csv           ← Add new datasets
└── risk_assessment_data.json             ← Add new datasets
```

## 🚀 After Adding Real Data

### **Step 1: Update AI Index (for PDF/Text files)**
```bash
cd server
python build_index.py
```

### **Step 2: Test with Real Data**
```bash
python test_ai.py
```

### **Step 3: Restart the Server**
```bash
npm run dev
```

## 📝 File Format Guidelines

### **For Transcripts (.txt/.pdf):**
- **Naming:** `[Quarter]_[Year]_[Type].txt`
- **Example:** `Q1_FY25_Earnings_Call.txt`
- **Content:** Full text of earnings calls, presentations, reports

### **For Structured Data (.csv/.json):**
- **Financial Data:** CSV format with date, metrics, values
- **Metadata:** JSON format for company info, business segments
- **Time Series:** Include date/quarter columns for trends

## 🔧 Integration with AI System

The AI assistant will automatically:
1. **Process documents** from `/transcripts/` using LlamaIndex
2. **Query structured data** from `/data/` for specific metrics
3. **Combine responses** for comprehensive answers

## 💡 Pro Tips

1. **Keep backups** of original files before replacing samples
2. **Maintain consistent naming** for easier data management
3. **Update regularly** to keep AI responses current
4. **Test after changes** to ensure everything works properly

---

**Ready to integrate your real dataset!** 🎯
