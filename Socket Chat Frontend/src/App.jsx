import { useState } from 'react';
import './App.css'
import {io} from 'socket.io-client'

function App() {
  const [userInput, setUserInput] = useState('')
  const socket = io('localhost:3000')

  //event listener for when client is connected to socket
  socket.on("connect", () => {
    console.log(socket.id, 'connected');
  });
  //event listener for when client is disconnected
  socket.on("disconnect", () => {
    console.log(socket.id, 'disconnected');
  });

  //event listener for when client recieves an event called 'message'
  socket.on('message', text => {
      console.log(text)
  });

  //handling user input
  const handleInput = (e) => {
    setUserInput(e.target.value)
  }

  //handling button click, send userInput
  const handleButtonClick = () => {
    socket.send(userInput)
    setUserInput('')
  }

  return (
    <>
      <input onChange={handleInput} value={userInput}></input>
      <button onClick={handleButtonClick}>Send Message</button>
    </>
  )
}

export default App
