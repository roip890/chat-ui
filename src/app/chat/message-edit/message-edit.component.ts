import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromMessage from '../store/message.reducers';
import * as MessageActions from "../store/message.actions";

import {Message} from "../message.model";
import {ChatService} from "../socket/chat.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {IconUrlModalComponent} from "./icon-url-modal/icon-url-modal.component";
import {NgxUidService} from "ngx-uid";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') messageForm: NgForm;
  iconUrl: string;
  modalRef: BsModalRef;
  messageState: Observable<fromMessage.State>;

  constructor(private store: Store<fromMessage.FeatureState>,
              private chatService: ChatService,
              private modalService: BsModalService,
              private uidService: NgxUidService) {
    this.iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png';
  }


  ngOnInit() {
    this.messageState = this.store.select('messages');
    this.store.dispatch(new MessageActions.FetchMessages());

  }

  onSubmit(form: NgForm) {
    const value = form.value;

    this.messageState
      .pipe(
        take(1)
        // and any other pipe operators like map if required
      )
      .subscribe(messages => {
        this.store.dispatch(new MessageActions.FetchMessages());
        let uuid;
        do {
          uuid = this.uidService.next();
        } while (messages.messages.some(message => message.id !== null && message.id === uuid));
        const newMessage = new Message(uuid, value.username, value.text, Date.now(), this.iconUrl);
        this.chatService.sendMessage(newMessage);
        form.controls['text'].reset();
      });

  }

  setIconUrl(iconUrl : string) {
    this.iconUrl = iconUrl;
  }


  openIconUrlModal() {

    this.modalRef = this.modalService.show(IconUrlModalComponent);
    this.modalRef.content.onClose.subscribe(result => {
      this.iconUrl = result.url;
    });

  }

  ngOnDestroy() {

  }

}
