@echo off
echo ===============================================
echo    Bajaj Finserv AI Assistant Setup Script
echo ===============================================

echo.
echo [1/4] Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing Ollama...
curl -fsSL https://ollama.com/install.sh | sh
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Ollama
    echo Please install Ollama manually from https://ollama.com
    pause
    exit /b 1
)

echo.
echo [3/4] Downloading Mistral model...
ollama pull mistral
if %errorlevel% neq 0 (
    echo ERROR: Failed to download Mistral model
    pause
    exit /b 1
)

echo.
echo [4/4] Building AI index from transcripts...
python build_index.py
if %errorlevel% neq 0 (
    echo ERROR: Failed to build AI index
    pause
    exit /b 1
)

echo.
echo ===============================================
echo    Setup completed successfully!
echo ===============================================
echo.
echo Next steps:
echo 1. Start Ollama: ollama serve
echo 2. Start backend: node index.js
echo 3. Start frontend: cd ../client && npm start
echo.
pause
