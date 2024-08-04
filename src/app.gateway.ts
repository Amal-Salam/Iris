/* eslint-disable prettier/prettier */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { Chat } from './iris_chat.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  private messages: any[] = []; 
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;
   

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: Chat): Promise<void> {
    await this.appService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }
  
  @SubscribeMessage('clearChats')
  handleClearChats(): void {
    this.messages = []; 
    this.server.emit('recMessage', this.messages); 
  } 

  afterInit(server: Server){
    console.log(server);
  }

  handleDisconnect(client: Socket){
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket){
    console.log(`Connected: ${client.id}`)
  }

}
