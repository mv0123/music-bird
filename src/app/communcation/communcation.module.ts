import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { RouterModule } from '@angular/router';
import routing from './communcation-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ChatContainerComponent,
    ChatMessagesComponent,
    MessageInputComponent,
        
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routing)

  ]
})
export class CommuncationModule { }
