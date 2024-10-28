import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from '../../core/services/events.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() visible = false;
  @Output() linkClick = new EventEmitter<string>();

  constructor(private eventService: EventsService) { }
  isSignUp = false;
  isClosed = false;

  ngOnInit(): void { }

  navigate(link: string): void {
    this.linkClick.emit(link);
  }

  sendEvent() {
    this.eventService.publish('showLoginPopup', { message: 'hello world' });
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
  }

}
