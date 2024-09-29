const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Log incoming requests to the Express server
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// Proxy requests to Flask backend
app.use('/flask', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: {
        '^/flask': '', // remove '/flask' from the request before forwarding it to Flask
    },
    onProxyRes(proxyRes, req, res) {
        let data = '';
        proxyRes.on('data', chunk => {
            data += chunk;
        });
        proxyRes.on('end', () => {
            console.log(`Response from Flask: ${data}`);
        });
    }
}));

// Example of existing endpoints
app.post('/summarize', async (req, res) => {
    const { chapterText } = req.body;
    try {
        const response = await axios.post(process.env.SUMMARIZATION_API_URL, { text: chapterText });
        res.json(response.data);
    } catch (error) {
        console.error('Error summarizing text:', error);
        res.status(500).json({ error: 'Failed to summarize text' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
