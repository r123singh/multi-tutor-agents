import { Agent, tool, run, setDefaultOpenAIKey } from "@openai/agents";
import { z } from "zod";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Set the OpenAI API key
setDefaultOpenAIKey(process.env.OPENAI_API_KEY);

// Express app setup
const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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