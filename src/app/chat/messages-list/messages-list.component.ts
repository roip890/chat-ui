import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMessage from '../store/message.reducers';
import * as MessageActions from "../store/message.actions";
import {ChatService} from "../socket/chat.service";
import {Message} from "../message.model";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit, OnDestroy {

  messageState: Observable<fromMessage.State>;
  io: any;

  constructor(private store: Store<fromMessage.FeatureState>, private chatService: ChatService) { }

  ngOnInit() {
    this.messageState = this.store.select('messages');
    this.store.dispatch(new MessageActions.FetchMessages());

    this.initIo();

  }

  private initIo(): void {

    this.io = this.chatService.onMessage()
      .subscribe((message: Message) => {
        this.messageState
          .pipe(
            take(1)
            // and any other pipe operators like map if required
          )
          .subscribe(messages => {
            if (!messages.messages.some(messageInState => messageInState.id && messageInState.id === message.id && message.id !== null)) {
              this.store.dispatch(new MessageActions.AddMessage(message));
              this.store.dispatch(new MessageActions.StoreMessages());
            }
          });





      });

  }

  ngOnDestroy() {
    this.io.unsubscribe();
  }

}
