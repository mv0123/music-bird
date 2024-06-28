import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
})
export class ChatContainerComponent implements OnInit {
  sessionUser: string = '';
  messageList: any[] = [];

  ngOnInit() {
    this.activeUser();
  }

  activeUser() {
    this.sessionUser = prompt("Enter your name") || "";
  }

  resetChat() {
    localStorage.removeItem('chatMessages');
    this.messageList = [];
  }

  sendMessage(message: string) {
    if (message.trim() !== "") {
      const newChat = {
        id: new Date().getTime(),
        msg: message,
        sender: this.sessionUser
      };
      this.messageList.push(newChat);
      localStorage.setItem('chatMessages', JSON.stringify(this.messageList));
    }
  }
}
