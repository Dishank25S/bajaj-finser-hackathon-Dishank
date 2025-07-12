@echo off
echo ========================================
echo Bajaj Finserv Chatbot - Netlify Deploy
echo ========================================
echo.

echo Step 1: Building React application...
cd client
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.
echo Step 2: Build folder ready for deployment
echo.
echo Your build files are located at:
echo %CD%\build
echo.
echo ========================================
echo NETLIFY DEPLOYMENT OPTIONS:
echo ========================================
echo.
echo OPTION 1 - Manual Deployment (Recommended for first deploy):
echo 1. Open Netlify dashboard in your browser
echo 2. Go to your site or create a new site
echo 3. Drag and drop the 'build' folder to Netlify
echo.
echo OPTION 2 - Automated Deployment:
echo 1. Connect your GitHub repository to Netlify
echo 2. Set build command: cd client ^&^& npm run build
echo 3. Set publish directory: client/build
echo.
echo OPTION 3 - Netlify CLI:
echo 1. Install: npm install -g netlify-cli
echo 2. Run: netlify deploy --prod --dir=build
echo.
echo ========================================
echo TROUBLESHOOTING:
echo ========================================
echo.
echo If you get 404 errors:
echo 1. Check that _redirects file is in build folder
echo 2. Verify netlify.toml is in project root
echo 3. Ensure publish directory is set to 'client/build'
echo.
echo For detailed instructions, see:
echo NETLIFY_DEPLOYMENT_GUIDE.md
echo.
echo Press any key to open the build folder...
pause > nul

explorer "%CD%\build"

echo.
echo 🚀 Ready for deployment!
echo.
pause
