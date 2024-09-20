import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-popup',
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss']
})
export class SubscriptionPopupComponent {
  // To handle the visibility of the popup
  showSubscribePopup: boolean = false;

  closePopup() {
    this.showSubscribePopup = false;
  }

  openPopup() {
    this.showSubscribePopup = true;
  }

  subscribe(plan: string) {
    // Handle subscription logic here
    console.log(`Subscribed to ${plan} plan`);
    this.closePopup(); // Close the popup after subscription
  }
}
