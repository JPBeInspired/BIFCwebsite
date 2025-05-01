import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFilePath = path.join(__dirname, '.env');
const envExampleContent = `GHL_API_KEY=your_api_key_here
PORT=5000`;

// Check if .env file exists
if (!fs.existsSync(envFilePath)) {
  // Create .env file with example content
  fs.writeFileSync(envFilePath, envExampleContent);
  console.log('.env file created successfully!');
  console.log('Please update the GHL_API_KEY in the .env file with your actual API key.');
} else {
  console.log('.env file already exists.');
  console.log('Make sure your GHL_API_KEY is properly set in the .env file.');
} 