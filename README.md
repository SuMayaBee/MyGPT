# MyGPT

Mygpt is a simple web application built using React, CSS, and a Node.js backend. It demonstrates the basic structure and functionality of a chat application using GPT-3.5-turbo from OpenAI. This README file will help you understand the project and its codebase.


https://github.com/Sumaiya-369/MyGPT/assets/126413802/7652b841-9d3e-4948-9e31-0b5788217d07


## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
  - [App.js](#appjs)
  - [server.js](#serverjs)
- [File Structure](#file-structure)
- [License](#license)

## Overview

The main goal of the project is to showcase a chat application that interacts with the GPT-3.5-turbo AI model provided by OpenAI. The application allows users to send messages and receive responses from the AI model.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Mygpt.git
```
2. Install the required dependencies:

```bash
cd Mygpt
npm install
```

3. Set up your `.env` file with your OpenAI API key:

```bash
echo "API_KEY=your_openai_api_key" > .env
```

4. Start the development server:

```bash
npm start
```

## Usage

Once the server is running, navigate to `http://localhost:8005` in your web browser to interact with the chat application.

## Code Explanation

### App.js

`App.js` is the main React component that contains the chat functionality and logic. It includes the following key features:

- State management using the `useState` and `useEffect` hooks.
- `createNewChat` function: Resets the current chat state and prepares for a new chat session.
- `handleClick` function: Changes the active chat based on the unique title.
- `getMessages` function: Sends a POST request to the backend server to fetch the AI-generated response.
- `handleSubmit` function: Handles the form submission event to trigger the `getMessages` function.
- Rendering of the chat history and user interface for sending messages.

### server.js

`server.js` is the Node.js backend server that handles API requests to OpenAI. It includes the following key features:

- Express.js app setup with CORS middleware.
- Loading of the OpenAI API key from the `.env` file using `dotenv`.
- `/completions` route: Handles the POST request from the frontend to fetch AI-generated responses. It sends the user message as input to the OpenAI API and receives the AI-generated message as output. The response is then sent back to the frontend.

## File Structure

The main files of the project include:

- `index.js`: The entry point for the React application.
- `App.js`: The main React component that contains the chat functionality and logic.
- `index.css`: The stylesheet for the application.
- `server.js`: The Node.js backend server that handles API requests to OpenAI.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

