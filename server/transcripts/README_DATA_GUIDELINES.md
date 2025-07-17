# Bajaj Finserv AI Assistant - Data File Guidelines
# ================================================================

SUPPORTED FILE FORMATS:
- PDF files (.pdf)
- Text files (.txt)
- Word documents (.docx)
- Markdown files (.md)

RECOMMENDED NAMING CONVENTION:
- Q1_FY25_Earnings_Call.pdf
- Q2_FY25_Earnings_Call.pdf
- Annual_Report_FY25.pdf
- Investor_Presentation_Q4_FY25.pdf
- Management_Discussion_Analysis_FY25.pdf
- Subsidiary_Performance_Report_FY25.pdf

FILE SIZE LIMITS:
- Individual file: Up to 50MB
- Total folder: Up to 500MB
- Recommended: Keep files under 10MB each for best performance

CONTENT GUIDELINES:
- Include earnings call transcripts
- Add annual reports
- Include investor presentations
- Add management commentary
- Include financial statements
- Add subsidiary performance data

AFTER ADDING NEW FILES:
1. Run: python build_index.py
2. Restart the server: node index.js
3. Test with new queries

EXAMPLE STRUCTURE:
/server/transcripts/
├── Earnings_Calls/
│   ├── Q1_FY25_Earnings_Call.pdf
│   ├── Q2_FY25_Earnings_Call.pdf
│   ├── Q3_FY25_Earnings_Call.pdf
│   └── Q4_FY25_Earnings_Call.pdf
├── Annual_Reports/
│   ├── Annual_Report_FY25.pdf
│   └── Annual_Report_FY24.pdf
├── Presentations/
│   ├── Investor_Presentation_Q4_FY25.pdf
│   └── Strategy_Presentation_FY25.pdf
└── Subsidiary_Reports/
    ├── BAGIC_Performance_FY25.pdf
    └── Housing_Finance_Report_FY25.pdf
