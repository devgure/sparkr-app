// backend/src/chat/chat.gateway.ts
import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, payload: { matchId: string; message: string }) {
    this.server.to(payload.matchId).emit('newMessage', payload);
  }

  @SubscribeMessage('joinMatch')
  handleJoin(client: any, matchId: string) {
    client.join(matchId);
  }
}