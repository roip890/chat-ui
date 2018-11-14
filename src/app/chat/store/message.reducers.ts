import { Message } from '../message.model';
import * as MessageActions from './message.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  messages: State
}

export interface State {
  messages: Message[];
}

const initialState: State = {
  messages: []
};

export function messageReducer(state = initialState, action: MessageActions.MessageActions) {
  switch (action.type) {
    case (MessageActions.SET_MESSAGES):
      console.log("set_messages");
      return {
        ...state,
        messages: [...action.payload]
      };
    case (MessageActions.ADD_MESSAGE):
      console.log("add_message");
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case (MessageActions.UPDATE_MESSAGE):
      console.log("update_message");
      const message = state.messages[action.payload.index];
      const updatedMessage = {
        ...message,
        ...action.payload.updatedMessage
      };
      const messages = [...state.messages];
      messages[action.payload.index] = updatedMessage;
      return {
        ...state,
        messages: messages
      };
    case (MessageActions.DELETE_MESSAGE):
      console.log("delete_message");
      const oldMessages = [...state.messages];
      oldMessages.splice(action.payload, 1);
      return {
        ...state,
        messages: oldMessages
      };
    default:
      return state;
  }
}
