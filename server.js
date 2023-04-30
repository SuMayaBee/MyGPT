const PORT = 8005;
const express = require('express');
const cors = require('cors');
//const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

const API_KEY = process.env.API_KEY;

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: req.body.message }],
            max_tokens: 100,
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        const modifiedData = {
            ...data,
            choices: [
                {
                    ...data.choices[0],
                    message: {
                        role: '🤖',
                        content: data.choices[0].message.content,
                    },
                },
            ],
        };
        res.send(modifiedData);
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => console.log('Your server is running on PORT', PORT));
