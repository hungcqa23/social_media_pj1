import { io, Socket } from 'socket.io-client';
import { BASE_ENDPOINT } from 'src/utils/http';

class SocketIOService {
  private socket!: Socket;

  getSocket(): Socket {
    return this.socket;
  }

  setUpConnection() {
    this.socket = io('http://localhost:5000', {
      transports: ['websocket'],
      secure: true
    });
    this.socketConnectionEvents();
  }

  socketConnectionEvents() {
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('disconnect', reason => {
      console.log('reason: ', reason);
      this.socket.connect();
    });

    this.socket.on('connect error', error => {
      console.log('error', error);
      this.socket.connect();
    });
  }
}

export const socketIOService: SocketIOService = new SocketIOService();
