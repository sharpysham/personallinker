// Filename: server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// In-memory storage for links
let links = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Fetch all links
app.get('/api/links', (req, res) => {
    res.json(links);
});

// Add a new link
app.post('/api/links', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const newLink = { id: Date.now(), url };
    links.push(newLink);
    res.status(201).json(newLink);
});

// Delete a link
app.delete('/api/links/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const linkIndex = links.findIndex(link => link.id === id);

    if (linkIndex === -1) {
        return res.status(404).json({ error: 'Link not found' });
    }

    links.splice(linkIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
