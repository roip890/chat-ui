import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "./socket/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.chatService.closeSocket();
  }
}
