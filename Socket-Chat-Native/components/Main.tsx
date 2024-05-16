/**
 * Main component
 *
 * @format
 */

import {useEffect, useState} from 'react';

export const  Main = ({socket}) =>{
  const [userInput, setUserInput] = useState('');
  const [recievedMessages, setRecievedMessages] = useState('write something');

  useEffect(() => {
    //event listener for when client is connected to socket
    const onConnect = () => {
      console.log(socket.id, 'connected');
    };
    socket.on('connect', onConnect);

    //event listener for when client is disconnected
    const onDisconnect = () => {
      console.log(socket.id, 'disconnected');
    };
    socket.on('disconnect', onDisconnect);

    //event listener for when client recieves an event called 'message'
    const onMessage = text => {
      console.log(text);
      setRecievedMessages(text);
    };
    socket.on('message', onMessage);

    //remove the event listeners when component is unloaded
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.off('message', onMessage)
    };
  }, []);

  //handling user input
  const handleInput = e => {
    setUserInput(e.target.value);
  };

  //handling button click, send userInput
  const handleButtonClick = () => {
    socket.emit('message', userInput);
    setUserInput('');
  };

  return (
    <>
      <div>{recievedMessages}</div>
      <input onChange={handleInput} value={userInput}></input>
      <button onClick={handleButtonClick}>Send Message</button>
    </>
  );
}