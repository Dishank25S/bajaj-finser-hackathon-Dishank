#!/bin/bash

echo "==============================================="
echo "    Bajaj Finserv AI Assistant Setup Script"
echo "==============================================="

echo ""
echo "[1/4] Installing Python dependencies..."
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Python dependencies"
    exit 1
fi

echo ""
echo "[2/4] Installing Ollama..."
curl -fsSL https://ollama.com/install.sh | sh
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Ollama"
    echo "Please install Ollama manually from https://ollama.com"
    exit 1
fi

echo ""
echo "[3/4] Downloading Mistral model..."
ollama pull mistral
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to download Mistral model"
    exit 1
fi

echo ""
echo "[4/4] Building AI index from transcripts..."
python3 build_index.py
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build AI index"
    exit 1
fi

echo ""
echo "==============================================="
echo "    Setup completed successfully!"
echo "==============================================="
echo ""
echo "Next steps:"
echo "1. Start Ollama: ollama serve"
echo "2. Start backend: node index.js"
echo "3. Start frontend: cd ../client && npm start"
echo ""
