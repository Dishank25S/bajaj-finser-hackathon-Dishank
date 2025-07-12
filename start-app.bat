@echo off
title Bajaj Finserv AI Chatbot Launcher

echo ========================================
echo    BAJAJ FINSERV AI CHATBOT LAUNCHER
echo ========================================
echo.

echo [1/3] Starting Backend Server...
echo.
start "Backend Server" cmd /k "cd /d "%~dp0server" && echo Starting Bajaj Finserv Backend Server... && node index.js"

echo Waiting for backend to initialize...
timeout /t 3 /nobreak > nul

echo.
echo [2/3] Starting Frontend Application...
echo.
start "Frontend App" cmd /k "cd /d "%~dp0client" && echo Starting Bajaj Finserv Frontend... && npm start"

echo.
echo [3/3] Opening Test Page...
echo.
timeout /t 5 /nobreak > nul
start "" "%~dp0test.html"

echo.
echo ========================================
echo    BAJAJ FINSERV CHATBOT IS STARTING
echo ========================================
echo.
echo Backend Server: http://localhost:5000
echo Frontend App:   http://localhost:3000
echo Test Page:      file:///test.html
echo.
echo Both terminals will open automatically.
echo Wait for "compiled successfully" message
echo in the frontend terminal, then navigate
echo to http://localhost:3000 in your browser.
echo.
echo Press any key to close this launcher...
pause > nul
