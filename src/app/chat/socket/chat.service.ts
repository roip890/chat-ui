import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Message} from "../message.model";
import {Observable} from "rxjs";

@Injectable()
export class ChatService {

  private socket;


  constructor() {
    this.socket = io('https://spotim-demo-chat-server.herokuapp.com');
  }

  public sendMessage(message: Message): void {
    this.socket.emit('spotim/chat', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('spotim/chat', (data: Message) => observer.next(data));
    });
  }

  public closeSocket() {
    this.socket.disconnect();
  }


}
