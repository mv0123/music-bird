import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isSignUp: boolean = false;
  mobileNumber: string = '';

  toggleAuth() {
    this.isSignUp = !this.isSignUp;
  }

  closeDialog() {
    // Logic to close the dialog
  }

  continue() {
    // Logic for continue action
  }
}