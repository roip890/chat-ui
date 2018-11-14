import { ActionReducerMap } from '@ngrx/store';

import * as fromMessage from '../chat/store/message.reducers';

export interface AppState {
  messagesList : fromMessage.State
}

export const reducers: ActionReducerMap<AppState> = {
  messagesList : fromMessage.messageReducer
};
