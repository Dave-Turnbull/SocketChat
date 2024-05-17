import { Main } from "./components/Main";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://192.168.1.171:3000", {transports: ['websocket']})

const App = () => {
  return <Main socket={socket} />;
};

export default App;
