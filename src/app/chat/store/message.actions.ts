import { Action } from '@ngrx/store';

import { Message } from '../message.model';

export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const STORE_MESSAGES = 'STORE_MESSAGES';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';

export class SetMessages implements Action {
  readonly type = SET_MESSAGES;

  constructor(public payload: Message[]) {}
}

export class AddMessage implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload: Message) {}
}

export class UpdateMessage implements Action {
  readonly type = UPDATE_MESSAGE;

  constructor(public payload: {index: number, updatedMessage: Message}) {}
}

export class DeleteMessage implements Action {
  readonly type = DELETE_MESSAGE;

  constructor(public payload: number) {}
}

export class StoreMessages implements Action {
  readonly type = STORE_MESSAGES;
}

export class FetchMessages implements Action {
  readonly type = FETCH_MESSAGES;
}

export type MessageActions = SetMessages |
                              AddMessage |
                              UpdateMessage |
                              DeleteMessage |
                              StoreMessages |
                              FetchMessages;
