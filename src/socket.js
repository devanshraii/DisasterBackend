import { Server } from 'socket.io';

let io;

export function setupSocket(server) {
  io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', socket => {
    console.log('Client connected');
  });
}

export function getIO() {
  return io;
}
