import { useEffect, useState } from 'react';
import './App.css'

function App({socket}) {
  const [userInput, setUserInput] = useState('')
  const [recievedMessages, setRecievedMessages] = useState('write something')

  useEffect(() => {
    //event listener for when client is connected to socket
    socket.on("connect", () => {
      console.log(socket.id, 'connected');
    });
    //event listener for when client is disconnected
    socket.on("disconnect", () => {
      console.log(socket.id, 'disconnected');
    });
  }, [recievedMessages])

  useEffect(() => {
    //event listener for when client recieves an event called 'message'
    socket.on('message', text => {
        console.log(text)
        setRecievedMessages(text)
    });
  }, [socket])

  //handling user input
  const handleInput = (e) => {
    setUserInput(e.target.value)
  }

  //handling button click, send userInput
  const handleButtonClick = () => {
    socket.emit('message', userInput )
    setUserInput('')
  }

  return (
    <>
      <div>
        {recievedMessages}
      </div>
      <input onChange={handleInput} value={userInput}></input>
      <button onClick={handleButtonClick}>Send Message</button>
    </>
  )
}

export default App
