import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Message} from "../message.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class ChatService {

  private socket;


  constructor() {
    this.socket = io(environment.chat_socket);
    // this.socket.removeAllListeners(environment.chat_event);
  }

  public sendMessage(message: Message): void {
    this.socket.emit(environment.chat_event,{
      room: environment.chat_room,
      message: message
    });
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on(environment.chat_event, (data: any) => {
        // console.log(data);
        if (data.room && data.room == environment.chat_room) {
          observer.next(data.message)
        }
      });
    });
  }

  public closeSocket() {
    this.socket.disconnect();
  }


}
