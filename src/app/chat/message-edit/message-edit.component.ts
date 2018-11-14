import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import {Message} from "../message.model";
import {ChatService} from "../socket/chat.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {IconUrlModalComponent} from "./icon-url-modal/icon-url-modal.component";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') messageForm: NgForm;
  iconUrl: string;
  modalRef: BsModalRef;

  constructor(private store: Store<fromApp.AppState>, private chatService: ChatService, private modalService: BsModalService) {
    this.iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png';
  }


  ngOnInit() { }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newMessage = new Message(value.username, value.text, Date.now(), this.iconUrl);
    // this.chatService.sendMessage(newMessage);
    form.controls['text'].reset();
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
