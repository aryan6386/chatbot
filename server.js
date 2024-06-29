const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const botResponses = {
    'hi': ['Hello! How can I help you today?', 'Hi there! What\'s up?', 'Hey! How are you doing?'],
    'hello': ['Hi there! What can I do for you?', 'Hello! How can I assist you?', 'Hi! What do you need?'],
    'how are you': ['I\'m just a bot, but I\'m doing great! How about you?', 'I\'m good, thanks for asking! How can I help you?', 'Doing well! What about you?'],
    'bye': ['Goodbye! Have a great day!', 'Bye! Take care!', 'See you later!'],
    'what is your name': ['I am a chatbot created to assist you.', 'I\'m your friendly chatbot.', 'You can call me Chatbot.'],
    'what can you do': ['I can chat with you, answer basic questions, and help you with simple tasks.', 'I\'m here to assist you with any queries you have.', 'I can provide information and keep you company.'],
    'tell me a joke': ['Why don’t scientists trust atoms? Because they make up everything!', 'Why was the math book sad? Because it had too many problems.', 'What do you get when you cross a snowman and a vampire? Frostbite.'],
    'what is the weather like': ['I don’t have access to real-time data, but you can check your local weather forecast online.', 'It might be sunny, cloudy, or rainy. Check your weather app for the latest update.', 'Weather? It\'s always perfect where I am!'],
    'who created you': ['I was created by a developer using JavaScript and Socket.IO.', 'A talented developer put me together.', 'I\'m a product of code and creativity.'],
    'help': ['Sure, I can help. What do you need assistance with?', 'I\'m here to help! What do you need?', 'What can I assist you with today?'],
    'what is the time': ['I don’t have access to real-time data, but you can check the current time on your device.', 'Time flies when you\'re chatting! Check your clock for the exact time.', 'Time? It\'s always chat o\'clock here!'],
    'what is the meaning of life': ['The meaning of life is a philosophical question, but many believe it’s to find happiness and fulfillment.', '42. That\'s the answer according to The Hitchhiker\'s Guide to the Galaxy.', 'Life is what you make of it.'],
    'how do I create a website': ['To create a website, you can use HTML, CSS, and JavaScript. There are many online tutorials and resources to help you get started.', 'Start with learning HTML for structure, CSS for styling, and JavaScript for functionality.', 'Creating a website is fun! Look for tutorials on HTML, CSS, and JavaScript.'],
    'what is your favorite color': ['I don’t have preferences, but I think all colors are beautiful!', 'I\'m impartial to all colors.', 'Every color has its own charm!'],
    'tell me something interesting': ['Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible!', 'Did you know that octopuses have three hearts?', 'Did you know that bananas are berries, but strawberries aren\'t?'],
    'how do I learn programming': ['You can learn programming by taking online courses, reading books, and practicing regularly. Start with a beginner-friendly language like Python or JavaScript.', 'Consistency is key. Practice coding every day and take advantage of free online resources.', 'Start small, build projects, and gradually take on more complex challenges.']
};

function getRandomResponse(responses) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log('Received message: ', message);
        const lowerCaseMessage = message.toLowerCase();
        const responses = botResponses[lowerCaseMessage];
        const response = responses ? getRandomResponse(responses) : 'Sorry, I don\'t understand that.';
        socket.emit('response', response);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
