import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-popup',
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss']
})
export class SubscriptionPopupComponent {
  showSubscribePopup: boolean = false;

  closePopup() {
    this.showSubscribePopup = false;
  }

  openPopup() {
    this.showSubscribePopup = true;
  }

  subscribe(plan: string) {
    console.log(`Subscribed to ${plan} plan`);
    this.closePopup(); 
  }
}
