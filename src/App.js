import { useState, useEffect } from 'react';

const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setCurrentTitle(null);
    setMessage(null);
    setValue('');
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue('');
  };

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch('http://localhost:8005/completions', options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMessages();
  };

  useEffect(() => {
    console.log(currentTitle, value, message)
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
          [...prevChats, {
            title: currentTitle,
            role: 'user',
            content: value

          },
            {
              title: currentTitle,
              role: message.role,
              content: message.content

            }
            ]
      ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles)
  return (
      <div className="app">
        <section className="side-bar">
          <button onClick={createNewChat}> + New chat </button>
          <ul className="history">
            {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
          </ul>
          <nav>
            <p>Made by Sumaiya</p>
          </nav>
        </section>
        <section className="main">
          {!currentTitle && <h1>MyGPT</h1>}
          <ul className="feed">
            {currentChat?.map((chatMessage, index) => (
                <li key={index}>
                  <p>
                    <span className="emoji">{chatMessage.role === 'user' ? '💬' : chatMessage.role}</span>
                    {chatMessage.content}
                  </p>
                </li>
            ))}
          </ul>
          <div className="bottom-section">
            <div className="input-container">
              <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
              />
              <div id="submit" onClick={getMessages}>➣</div>
            </div>
            <p className="info">
              Chat GPT Mar 14 Version. Free Research Preview. Our Goal is to make
              AI system more natural and safe to interact with humans. Your
              feedback is valuable to us and will help us improve our system.
            </p>
          </div>
        </section>
      </div>
  );
};

export default App;