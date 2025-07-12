@echo off
echo ================================================
echo   Enhanced AI System Test Script
echo   Testing Fallback Responses and New Features
echo ================================================
echo.

echo Testing server connectivity...
curl -s http://localhost:5000/api/ai-health
echo.
echo.

echo ================================================
echo Test 1: Stock Price Query (Should work)
echo ================================================
curl -s -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"What was the highest stock price in 2024?\"}"
echo.
echo.

echo ================================================
echo Test 2: Future Prediction (Should trigger fallback)
echo ================================================
curl -s -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"What will the stock price be next month?\"}"
echo.
echo.

echo ================================================
echo Test 3: Vague Query (Should provide guidance)
echo ================================================
curl -s -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"Tell me about the company\"}"
echo.
echo.

echo ================================================
echo Test 4: Out of Scope Query (Should suggest alternatives)
echo ================================================
curl -s -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"What is the weather today?\"}"
echo.
echo.

echo ================================================
echo Test 5: Insurance Business Query (Should work)
echo ================================================
curl -s -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"How is BAGIC performing?\"}"
echo.
echo.

echo ================================================
echo Test 6: Financial Metrics (Should work)
echo ================================================
curl -s -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"What was the revenue growth in Q2 FY25?\"}"
echo.
echo.

echo ================================================
echo AI Training Status:
echo ================================================
curl -s http://localhost:5000/api/training-status
echo.
echo.

echo ================================================
echo Testing completed!
echo Check the responses above to verify:
echo 1. Successful queries provide relevant answers
echo 2. Fallback responses are helpful and structured
echo 3. Confidence scores are included
echo 4. Suggestions are context-appropriate
echo ================================================
pause
