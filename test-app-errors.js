// Simple test to check for app errors
console.log("🔍 Testing app components...");

try {
  // Test if React imports work
  const React = require('react');
  console.log("✅ React import: OK");
} catch (error) {
  console.log("❌ React import failed:", error.message);
}

try {
  // Check if styled-components can be imported
  const styled = require('styled-components');
  console.log("✅ Styled-components import: OK");
} catch (error) {
  console.log("❌ Styled-components import failed:", error.message);
}

try {
  // Check if axios can be imported
  const axios = require('axios');
  console.log("✅ Axios import: OK");
} catch (error) {
  console.log("❌ Axios import failed:", error.message);
}

// Check if chatApi.js has syntax errors
const fs = require('fs');
const path = require('path');

try {
  const chatApiPath = path.join(__dirname, 'client', 'src', 'api', 'chatApi.js');
  const chatApiContent = fs.readFileSync(chatApiPath, 'utf8');
  
  // Basic syntax checks
  const openBraces = (chatApiContent.match(/{/g) || []).length;
  const closeBraces = (chatApiContent.match(/}/g) || []).length;
  const openParens = (chatApiContent.match(/\(/g) || []).length;
  const closeParens = (chatApiContent.match(/\)/g) || []).length;
  
  console.log(`\n📊 chatApi.js syntax check:`);
  console.log(`${openBraces === closeBraces ? '✅' : '❌'} Braces: ${openBraces} open, ${closeBraces} close`);
  console.log(`${openParens === closeParens ? '✅' : '❌'} Parentheses: ${openParens} open, ${closeParens} close`);
  
  if (chatApiContent.includes('export')) {
    console.log("✅ Has exports");
  } else {
    console.log("❌ Missing exports");
  }
  
} catch (error) {
  console.log("❌ Error reading chatApi.js:", error.message);
}

console.log("\n🏃‍♂️ Try running the app with: cd client && npm start");
console.log("📋 Check the browser console for detailed error messages");
console.log("🔧 If errors persist, try: rm -rf node_modules && npm install");
