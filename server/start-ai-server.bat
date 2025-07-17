@echo off
echo Starting Bajaj Finserv AI Assistant...

echo [1/3] Starting Ollama service...
start "Ollama" ollama serve

echo [2/3] Building AI index (if needed)...
if not exist "storage" (
    echo Building AI index from transcripts...
    python build_index.py
    if %errorlevel% neq 0 (
        echo WARNING: Failed to build AI index. AI features may be limited.
    )
)

echo [3/3] Starting backend server...
node index.js

pause
