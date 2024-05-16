"use strict";
/**
 * Main component
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_2 = require("react-native");
var Main = function (_a) {
    var socket = _a.socket;
    var _b = (0, react_1.useState)(''), userInput = _b[0], setUserInput = _b[1];
    var _c = (0, react_1.useState)('write something'), recievedMessages = _c[0], setRecievedMessages = _c[1];
    (0, react_1.useEffect)(function () {
        //event listener for when client is connected to socket
        var onConnect = function () {
            console.log(socket.id, 'connected');
        };
        socket.on('connect', onConnect);
        //event listener for when client is disconnected
        var onDisconnect = function () {
            console.log(socket.id, 'disconnected');
        };
        socket.on('disconnect', onDisconnect);
        //event listener for when client recieves an event called 'message'
        var onMessage = function (text) {
            console.log(text);
            setRecievedMessages(text);
        };
        socket.on('message', onMessage);
        //remove the event listeners when component is unloaded
        return function () {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            // socket.off('message', onMessage)
        };
    }, [socket]);
    //handling button click, send userInput
    var handleButtonClick = function () {
        socket.emit('message', userInput);
        setUserInput('');
    };
    var onChange = function (e) {
        var value = e.nativeEvent.text;
        setRecievedMessages(value);
    };
    return (<>
      <react_native_2.View>{recievedMessages}</react_native_2.View>
      <react_native_2.TextInput onChange={onChange} value={userInput}></react_native_2.TextInput>
      <react_native_1.Button title="Button send" onPress={handleButtonClick}/>
    </>);
};
exports.Main = Main;
