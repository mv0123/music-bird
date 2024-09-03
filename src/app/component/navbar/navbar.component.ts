import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchSongs() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
  navigateToLogin(signUp: boolean) {
    this.router.navigate(['/login'], { queryParams: { signUp } });
  }
}
