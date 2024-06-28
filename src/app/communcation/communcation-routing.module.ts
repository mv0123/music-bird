import { Routes } from '@angular/router';
import { ChatContainerComponent } from './chat-container/chat-container.component';


const routing: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "chat" },
  { path: "chat", component: ChatContainerComponent },

];

export default routing
