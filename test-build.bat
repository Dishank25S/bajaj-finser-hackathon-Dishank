@echo off
echo ========================================
echo Testing Build Before Deployment
echo ========================================
echo.

echo Cleaning previous build...
cd client
if exist build rmdir /s /q build
echo.

echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: npm install failed!
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully
echo.

echo Building React application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Build failed!
    echo.
    echo Check the errors above and fix them before deploying.
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.

echo Checking build folder contents...
if not exist build (
    echo ❌ ERROR: Build folder not created!
    pause
    exit /b 1
)

if not exist build\index.html (
    echo ❌ ERROR: index.html not found in build folder!
    pause
    exit /b 1
)

if not exist build\static (
    echo ❌ ERROR: static folder not found in build folder!
    pause
    exit /b 1
)

if not exist build\_redirects (
    echo ❌ WARNING: _redirects file not found! SPA routing might not work.
    echo This file should exist for proper routing on deployment platforms.
    pause
)

echo.
echo ========================================
echo ✅ BUILD TEST PASSED!
echo ========================================
echo.
echo Your app is ready for deployment to:
echo • Netlify (drag & drop build folder)
echo • Vercel (connect GitHub repository)
echo • Any static hosting platform
echo.
echo Build folder location: %CD%\build
echo.
echo Would you like to open the build folder?
set /p choice="Open build folder? (y/n): "
if /i "%choice%"=="y" explorer "%CD%\build"

echo.
echo Next steps:
echo 1. Commit and push your changes to GitHub
echo 2. Deploy using the platform of your choice
echo 3. Your app should now build successfully!
echo.
pause
