# AI Tutor Application

A modern, engaging web application that provides AI-powered tutoring for History, Math, and English subjects. The application features a beautiful, responsive UI with real-time chat functionality.

## Features

### 🎨 Modern UI/UX
- **Beautiful Design**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Subject Selection**: Visual cards for choosing between History, Math, and English tutors

### 💬 Chat Interface
- **Real-time Chat**: Modern chat interface with message bubbles
- **Quick Questions**: Pre-defined example questions for each subject
- **Message Formatting**: Support for bold, italic, and code formatting
- **Loading States**: Visual feedback during AI processing
- **Clear Chat**: Easy way to reset the conversation

### 🤖 AI Integration
- **Smart Routing**: Automatically routes questions to the appropriate tutor agent
- **History Tutor**: Specialized in historical facts and events
- **Math Tutor**: Provides step-by-step mathematical explanations
- **English Tutor**: Helps with grammar, vocabulary, and language skills

## Tech Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Inter font family for modern typography

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework for API endpoints
- **OpenAI Agents**: AI-powered tutoring system
- **Zod**: Schema validation

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Getting Started
1. **Choose a Subject**: Click on one of the subject cards (History, Math, or English)
2. **Ask Questions**: Type your question in the chat input
3. **Quick Questions**: Use the pre-defined example questions to get started
4. **Clear Chat**: Use the clear button to start a new conversation

### Example Questions

#### History
- "What is the Battle of Hastings?"
- "Tell me about the Roman Empire"
- "What caused World War I?"

#### Math
- "How do I solve quadratic equations?"
- "Explain the Pythagorean theorem"
- "What is calculus used for?"

#### English
- "What are the parts of speech?"
- "Explain subject-verb agreement"
- "How do I write a good essay?"

## Project Structure

```
Tutor/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── script.js           # Frontend JavaScript
├── index.js                # Backend server and AI logic
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependencies
└── README.md              # This file
```

## API Endpoints

### POST `/api/ask`
Sends a question to the AI tutor and returns the answer.

**Request Body:**
```json
{
  "question": "What is the Battle of Hastings?"
}
```

**Response:**
```json
{
  "answer": "The Battle of Hastings was fought on October 14, 1066..."
}
```

## Customization

### Adding New Subjects
1. Add a new agent in `index.js`
2. Update the subject cards in `index.html`
3. Add the subject to the JavaScript mapping in `script.js`

### Styling
- Modify `public/styles.css` to change colors, fonts, and layout
- The design uses CSS custom properties for easy theming
- Responsive breakpoints are defined for mobile optimization

### AI Behavior
- Modify agent instructions in `index.js` to change how the AI responds
- Add new tools to enhance the AI's capabilities
- Adjust the orchestrator logic for better question routing

## Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Run `npm install` to install missing dependencies

2. **OpenAI API errors**
   - Check your API key in the `.env` file
   - Ensure you have sufficient API credits

3. **Port already in use**
   - Change the PORT in your `.env` file
   - Or kill the process using the current port

4. **Static files not loading**
   - Ensure the `public` folder exists
   - Check file permissions

### Development

For development with auto-restart:
```bash
npm install -g nodemon
nodemon index.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Review the console for error messages
3. Ensure all dependencies are properly installed
4. Verify your environment variables are set correctly

---

**Happy Learning! 🎓**
