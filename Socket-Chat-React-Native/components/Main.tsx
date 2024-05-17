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
  const [isTimer, setIsTimer] = useState(false);
  const [timerTime, setTimerTime] = useState(null);
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

    //event listener for when client recieves an event called 'message'
    const onTimerStart = (text: string) => {
      setRecievedMessages(text);
      setIsTimer(true);
      setTimerTime(10)
    };
    socket.on('timerStart', onTimerStart);

    //remove the event listeners when component is unloaded
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage)
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
  
  const handleStartTimer = () => {
    socket.emit('timerStart', user);
    setIsTimer(true);
  };

  //TIMER FUNCTIONS
  useEffect(() => {
    if(timerTime <= 0){
      setTimerTime(null)
      setIsTimer(false)
    }

    // exit early when we reach 0
    if (!setTimerTime) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {

      setTimerTime(timerTime - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timerTime]);

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          height: 400,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>
          {recievedMessages}
        </Text>
      <TextInput onChange={onChange} value={userInput}></TextInput>
      <Button title="Button" onPress={handleButtonClick} />
      <Button disabled={isTimer} title="Start Synced Timer" onPress={handleStartTimer} />
      {timerTime && <Text>Timer: {timerTime}</Text>}
      {isConnected && <Text>Connected</Text>}
      </View>
    </>
  );
};
