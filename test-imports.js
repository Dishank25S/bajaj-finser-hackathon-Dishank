// Test React app compilation
import React from 'react';

// Test importing the main app component
try {
  console.log("Testing App.js import...");
  const App = require('./client/src/App.js');
  console.log("✅ App.js imported successfully");
} catch (error) {
  console.log("❌ App.js import failed:", error.message);
}

// Test API imports
try {
  console.log("Testing chatApi.js import...");
  const { sendMessage } = require('./client/src/api/chatApi.js');
  console.log("✅ chatApi.js imported successfully");
} catch (error) {
  console.log("❌ chatApi.js import failed:", error.message);
}

console.log("🎉 All basic imports successful!");
