import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  ngOnInit(): void {
  }
  constructor(private router: Router) {}


  search() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  navigateToSignUp() {
    // this.router.navigate(['/signup']);
  }
  navigateToLogin(signUp: boolean) {
    this.router.navigate(['/login'], { queryParams: { signUp } });
  }

 }