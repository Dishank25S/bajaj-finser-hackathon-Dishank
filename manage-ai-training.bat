@echo off
echo ========================================
echo Bajaj Finserv AI Training Data Manager
echo ========================================
echo.

:menu
echo Choose an option:
echo 1. Add new training data
echo 2. View current training data
echo 3. Retrain AI system
echo 4. Test AI responses
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto add_data
if "%choice%"=="2" goto view_data
if "%choice%"=="3" goto retrain
if "%choice%"=="4" goto test_ai
if "%choice%"=="5" goto exit
goto menu

:add_data
echo.
echo ========================================
echo Add New Training Data
echo ========================================
echo.
echo Current data directory: server\data\
echo.
echo Supported file types:
echo - CSV files (stock prices): *price*.csv, *stock*.csv
echo - Text files (transcripts): *transcript*.txt, *earnings*.txt
echo - JSON files (reports): *financial*.json, *report*.json
echo - General text files: *.txt
echo.
echo To add new data:
echo 1. Copy your files to: server\data\
echo 2. Follow naming conventions above
echo 3. Use this script to retrain the AI
echo.
echo Would you like to open the data folder?
set /p open="Open data folder? (y/n): "
if /i "%open%"=="y" explorer "server\data"
echo.
echo After adding files, return here and choose option 3 to retrain.
echo.
pause
goto menu

:view_data
echo.
echo ========================================
echo Current Training Data
echo ========================================
echo.
echo Files in server\data\:
dir "server\data" /b
echo.
echo File details:
dir "server\data" /b | findstr /v "." >nul
if errorlevel 1 (
    for %%f in ("server\data\*") do (
        echo %%~nxf - %%~zf bytes
    )
) else (
    echo No data files found.
)
echo.
pause
goto menu

:retrain
echo.
echo ========================================
echo Retraining AI System
echo ========================================
echo.
echo This will restart the server and retrain the AI with all data.
echo Make sure the server is not currently running.
echo.
set /p confirm="Continue with retraining? (y/n): "
if not /i "%confirm%"=="y" goto menu

echo.
echo Starting server and training AI...
cd server
call npm run dev

echo.
echo Training completed! Check the server console for details.
pause
goto menu

:test_ai
echo.
echo ========================================
echo Test AI Responses
echo ========================================
echo.
echo Example questions to test:
echo.
echo Stock Queries:
echo - "What was the highest stock price in Jan-23?"
echo - "Show me the stock trend last quarter"
echo.
echo Financial Performance:
echo - "Tell me about revenue growth"
echo - "How is BAGIC performing?"
echo.
echo Comparative Analysis:
echo - "Compare Q1 vs Q2 performance"
echo - "Show me year-over-year growth"
echo.
echo General:
echo - "Generate CFO commentary"
echo - "What are the key insights?"
echo.
echo To test these:
echo 1. Make sure the server is running (npm run dev in server folder)
echo 2. Open the web app at http://localhost:3000
echo 3. Try the questions above in the chat
echo.
echo Would you like to start the application?
set /p start="Start the application? (y/n): "
if /i "%start%"=="y" (
    echo Starting application...
    call start-app.bat
)
echo.
pause
goto menu

:exit
echo.
echo ========================================
echo AI Training Tips:
echo ========================================
echo.
echo 1. Add more specific financial data for better responses
echo 2. Include context and units in your data
echo 3. Use standard financial terminology
echo 4. Retrain after adding new data
echo 5. Test responses after training
echo.
echo Thank you for using the Bajaj Finserv AI Training Manager!
echo.
pause
exit /b 0
