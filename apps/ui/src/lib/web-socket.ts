import { io } from "socket.io-client";

const BASE_API_URL = import.meta.env.VITE_API_URL;
const webSocket = io(BASE_API_URL);

export default webSocket;
