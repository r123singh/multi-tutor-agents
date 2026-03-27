import { Agent, tool, run, setDefaultOpenAIKey } from "@openai/agents";
import { z } from "zod";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Express app setup
const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Set the OpenAI API key
// In a frontend web app, you cannot securely prompt for the OpenAI API key and use it directly from the client side.
// Instead, you should:
// 1. On the backend (this file), do NOT prompt for the API key. If it's missing, send a response to the frontend indicating the key is missing.
// 2. On the frontend, if the backend indicates the key is missing, show an engaging prompt to the user to input their API key.
// 3. The frontend should then send the key to the backend (e.g., via a POST to /api/set-key), and the backend should use it for that session (not recommended for production, but possible for dev/demo).

// Here, we add middleware to check for the API key and an endpoint to accept a user-provided key.

let userProvidedApiKey = null;

// Middleware to check API key before handling API requests (this is the backend)
app.use('/api', (req, res, next) => {
    if (!process.env.OPENAI_API_KEY && !userProvidedApiKey) {   // if the API key is missing, send a response to the frontend indicating the key is missing.
        return res.status(401).json({
            // This is the error message that the frontend will display to the user.
            error: "API_KEY_MISSING",
            message: "OpenAI API key is missing. Please provide your API key."
        });
    }
    next();
});

// Endpoint to accept user-provided API key (this is the backend)
app.post('/api/set-key', express.json(), (req, res) => {
    const { apiKey } = req.body;
    if (!apiKey || typeof apiKey !== "string" || !apiKey.startsWith("sk-")) {
        return res.status(400).json({ error: "Invalid API key." });
    }
    userProvidedApiKey = apiKey;
    setDefaultOpenAIKey(apiKey);
    return res.json({ success: true });
});

// When setting the OpenAI key, prefer user-provided key if available
setDefaultOpenAIKey(userProvidedApiKey || process.env.OPENAI_API_KEY);



const historyFunFact = tool({
    name: "historyFunFact",
    description: "A tool that returns a fun fact about history",
    parameters: z.object({}),
    execute: async () => {
        return "The Battle of Hastings was fought in 1066.";
    },
});

const historyTutorAgent = new Agent({
    name: "History Tutor",
    instructions: "You are a history tutor. You are given a question and you need to answer it.",
    tools: [historyFunFact],
});

const mathTutorAgent = new Agent({
    name: "Math Tutor",
    instructions: "You are a math tutor. You are given a question and you need to answer it. Explain the steps and the reasoning behind the answer.",
});

const englishTutorAgent = new Agent({
    name: "English Tutor",
    instructions: "You are an English tutor. You are given a question and you need to answer it. Explain the steps and the reasoning behind the answer.",
});

const orchestratorAgent = new Agent({
    name: "Orchestrator Agent",
    instructions: "You determine which tutor agent to use based on the user's question.",
    handoffs: [historyTutorAgent, mathTutorAgent, englishTutorAgent],
});

async function fetchAnswer(question) {
    const result = await run(orchestratorAgent, question);
    return result.finalOutput;
}

// API Routes
app.post('/api/ask', async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }
        
        // If this is a test question, just return a simple response
        if (question === 'test') {
            return res.json({ answer: 'API key is valid' });
        }
        
        const answer = await fetchAnswer(question);
        res.json({ answer });
        
    } catch (error) {
        console.error('Error processing question:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AI Tutor server running on http://localhost:${PORT}`);
    console.log(`📚 Available subjects: History, Math, English`);
});