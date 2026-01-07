// This is an illustrative example of what a Node.js Express backend server would look like.
// You would run this file on a server (e.g., using `node server/index.js`).
// It is not connected to the frontend in this environment, but shows the architecture.

const express = require('express');
const { GoogleGenAI } = require('@google/genai'); // Use require for CommonJS in Node.js

// Load environment variables from a .env file if you are developing locally
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// IMPORTANT: Your API key should be stored securely on the server as an environment variable.
// It should NEVER be exposed to the frontend.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is not set in server environment variables.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });


// --- API Routes ---

// Example route for the AI Chatbot Companion
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, history } = req.body; // Get prompt and history from frontend request

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const chat = model.startChat({
        history: history || [],
        // The safety settings and system instructions would be configured here on the backend
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ text }); // Send the response back to the frontend

  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to get response from AI model.' });
  }
});

// Example route for saving a journal entry (would connect to a database)
app.post('/api/journal', (req, res) => {
    const { entryText, mood, tags } = req.body;
    console.log('Received journal entry:', { entryText, mood, tags });
    // Here you would add logic to save the entry to a database (e.g., MongoDB, PostgreSQL)
    res.status(201).json({ success: true, message: 'Journal entry saved.' });
});

// Example route for scheduling an appointment
app.post('/api/schedule', (req, res) => {
    const { date, time, name } = req.body;
    console.log('Received schedule request:', { date, time, name });
    // Logic to save to a database and maybe send a confirmation email
    res.status(201).json({ success: true, message: 'Session scheduled.' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
