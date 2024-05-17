/**
 * Main component
 *
 * @format
 */

import {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {Socket} from 'socket.io-client';
import { user } from '../config.js'

type MainProps = {
  socket: Socket;
};

export const Main = ({socket}: MainProps) => {
  const [userInput, setUserInput] = useState<string>('');
  const [recievedMessages, setRecievedMessages] = useState('write something');
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    //event listener for when client is connected to socket
    const onConnect = () => {
      console.log(socket.id, 'connected');
      setIsConnected(true)
    };
    socket.on('connect', onConnect);

    //event listener for when client is disconnected
    const onDisconnect = () => {
      console.log(socket.id, 'disconnected');
      setIsConnected(false)
    };
    socket.on('disconnect', onDisconnect);

    //event listener for when client recieves an event called 'message'
    const onMessage = (text: string) => {
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
  }, [socket]);


  
  //handling button click, send userInput
  const handleButtonClick = () => {
    user.text = userInput
    socket.emit('message', user);
    setUserInput('');
  };

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    const value = e.nativeEvent.text;
    setUserInput(value);
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          height: 400,
          padding: 20,
        }}>
        <Text>
          {recievedMessages}
        </Text>
      <TextInput onChange={onChange} value={userInput}></TextInput>
      <Button title="Button send" onPress={handleButtonClick} />
      {isConnected && <Text>Connected</Text>}
      </View>
    </>
  );
};
