import { Main } from "./components/Main.tsx";
import { io, Socket } from "socket.io-client";

let socket: Socket;
socket = io("localhost:3000");

type AppProps = {
  socket: Socket;
};

const App = ({ socket }: AppProps) => {
  return <Main socket={socket} />;
};

export default App;
