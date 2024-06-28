import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  @Output() sendMessage = new EventEmitter<string>();

  send(message: string) {
    this.sendMessage.emit(message);
  }

  
}

