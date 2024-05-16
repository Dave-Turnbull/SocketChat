import { Main } from "./components/Main";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("localhost:3000");

const App = () => {
  return <Main socket={socket} />;
};

export default App;
