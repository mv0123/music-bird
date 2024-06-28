import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from '../../../core/services/events.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isSignUp: boolean = false;

  constructor(private route: ActivatedRoute, private location :Location) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isSignUp = params['signUp'] === 'true';
    });
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  navigateBack() {
    window.location.reload();
    this.location.back();
  }
}
