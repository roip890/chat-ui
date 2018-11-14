import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as MessageActions from './message.actions';
import {Message} from '../message.model';
import * as fromMessage from './message.reducers';

@Injectable()
export class MessageEffects {
  @Effect()
  messageFetch = this.actions$
    .ofType(MessageActions.FETCH_MESSAGES)
    .pipe(switchMap((action: MessageActions.FetchMessages) => {
      console.log("fetch_message");
      return this.httpClient.get<Message[]>('https://spotimchatex.firebaseio.com/messages.json', {
        observe: 'body',
        responseType: 'json'
      });
    }), map(
      (messages) => {
        if (!messages) {
          messages = [];
        }
        return {
          type: MessageActions.SET_MESSAGES,
          payload: messages.sort((a,b) => a.time - b.time)
        };
      }
));

  @Effect({dispatch: false})
  messageStore = this.actions$
    .ofType(MessageActions.STORE_MESSAGES)
    .pipe(withLatestFrom(this.store.select('messages')),
      switchMap(([action, state]) => {
        console.log("store_message");
        const req = new HttpRequest('PUT', 'https://spotimchatex.firebaseio.com/messages.json', state.messages, {reportProgress: true});
        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromMessage.FeatureState>) {
  }
}
