import { io, Socket } from 'socket.io-client';


let socket: Socket | undefined;

if (process.env.NEXT_PUBLIC_HOST_API) {
  socket = io(process.env.NEXT_PUBLIC_HOST_API, {
    path: process.env.NEXT_PUBLIC_WEBSOCKET_PATH
  });
}

export default socket;
