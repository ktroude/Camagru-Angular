import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {}
  
  newComment() {
    return this.socket.fromEvent('newComment');
  }

  newLike() {
    return this.socket.fromEvent('newLike');
  }
}
