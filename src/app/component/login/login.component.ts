import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; // Ensure the path is correct

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSignUp: boolean = false;
  mobileNumber: string = '';

  constructor(private authService: AuthService) {}

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
  }

  continue(): void {
    console.log(`${this.isSignUp ? 'Signing up' : 'Logging in'} with number: ${this.mobileNumber}`);
    // Implement login/signup logic here
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then(() => {
      console.log('Logged in with Google');
    }).catch(error => {
      console.error('Google login error:', error);
    });
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook().then(() => {
      console.log('Logged in with Facebook');
    }).catch(error => {
      console.error('Facebook login error:', error);
    });
  }

  closeLogin(): void {
    // Logic to close the login component
  }
}
