import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { FormsModule } from "@angular/forms";

import { messageReducer } from './store/message.reducers';
import {MessageItemComponent} from "./messages-list/message-item/message-item.component";
import {MessageEditComponent} from "./message-edit/message-edit.component";
import {MessagesListComponent} from "./messages-list/messages-list.component";
import {ChatComponent} from "./chat.component";
import {MessageEffects} from "./store/message.effects";
import {ChatService} from "./socket/chat.service";
import {DropdownDirective} from "./tools/dropdown.directive";
import {BsModalService} from "ngx-bootstrap";
import {IconUrlModalComponent} from "./message-edit/icon-url-modal/icon-url-modal.component";

@NgModule({
  declarations: [
    MessageItemComponent,
    MessageEditComponent,
    MessagesListComponent,
    ChatComponent,
    IconUrlModalComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('messages', messageReducer),
    EffectsModule.forFeature([MessageEffects])
  ],
  providers: [ChatService,
    BsModalService],
  exports: [
    ChatComponent,
    IconUrlModalComponent,
    DropdownDirective
  ]
})
export class ChatModule {}
