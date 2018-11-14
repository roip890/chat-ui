import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { ChatModule } from "./chat/chat.module";
import {BrowserModule} from "@angular/platform-browser";
import {NgxUidModule} from "ngx-uid";

import { AppComponent } from './app.component';
import { reducers } from './store/app.reducers';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ChatService} from "./chat/socket/chat.service";
import {ModalModule} from "ngx-bootstrap";
import {IconUrlModalComponent} from "./chat/message-edit/icon-url-modal/icon-url-modal.component";
import {HeaderComponent} from "./header/header.component";

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ChatModule,
    NgxUidModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    ModalModule.forRoot()
  ],
  providers: [ChatService],
  bootstrap: [AppComponent],
  entryComponents: [IconUrlModalComponent]
})
export class AppModule { }
