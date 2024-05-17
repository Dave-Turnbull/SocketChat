import { Main } from "./components/Main";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://86.157.125.189:3000", {transports: ['websocket']})

const App = () => {
  return <Main socket={socket} />;
};

export default App;
