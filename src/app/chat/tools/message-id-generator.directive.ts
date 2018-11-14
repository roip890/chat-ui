import { v4 as uuid } from 'uuid';
import { NgxUidService }  from 'ngx-uid';

export class MessageIdFactory implements NgxUidService {
  next() { return uuid(); }
}
