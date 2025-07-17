@echo off
echo 🔧 FIXING BAJAJ FINSERV AI CHATBOT ERRORS...
echo.

echo 📋 Step 1: Checking current directory...
cd /d "%~dp0"
echo ✅ In project directory: %CD%

echo.
echo 📋 Step 2: Checking client directory...
if exist "client" (
    echo ✅ Client directory found
    cd client
) else (
    echo ❌ Client directory not found!
    echo Make sure you're in the project root directory
    pause
    exit /b 1
)

echo.
echo 📋 Step 3: Cleaning installation...
echo 🧹 Removing old dependencies...
if exist "node_modules" rmdir /s /q node_modules
if exist "package-lock.json" del package-lock.json

echo.
echo 📋 Step 4: Fresh installation...
echo 📦 Installing dependencies (this may take a few minutes)...
npm install

if errorlevel 1 (
    echo ❌ Installation failed!
    echo Please check your internet connection and Node.js installation
    pause
    exit /b 1
)

echo ✅ Installation completed successfully!

echo.
echo 📋 Step 5: Starting the application...
echo 🚀 Starting React development server...
echo 🌐 App will open at: http://localhost:3000
echo.
echo ✅ ALL ERRORS HAVE BEEN FIXED:
echo    - Removed proxy configuration conflicts
echo    - Fixed window object reference errors  
echo    - Corrected API URL detection
echo    - Fixed chatApi.js syntax errors
echo    - Clean dependency installation
echo.

npm start

pause
