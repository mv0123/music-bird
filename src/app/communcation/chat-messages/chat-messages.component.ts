import { Component, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent {
  @Input() messageList: any[] = [];
  @Input() sessionUser: string = '';
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  deleteMessage(messageID: number): void {
    this.messageList = this.messageList.filter(chat => chat.id !== messageID);
  }

  editMessage(message: any): void {
    const newText = prompt("Enter new message:", message.msg);
    if (newText !== null && newText.trim() !== "") {
      message.msg = newText;
    }
  }
  constructor(private el: ElementRef) { }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
 

  scrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch(err) { }
  }


  
}

