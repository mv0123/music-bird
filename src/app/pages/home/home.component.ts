import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  links = [
    { label: 'New Releases', link: '/newReleases' },
    { label: 'Charts', link: '/topCharts' },
    { label: 'Top Playlists', link: '/topPlaylists' },
    { label: 'Top Trending', link: '/podCasts' },
    { label: 'Top Albums', link: '/topArtists' },
    { label: 'Top Radio', link: '/topRadios' },
  ];

  activeLink: string | undefined;
  isHomePage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.router.url;
        this.isHomePage = this.router.url === '/';
      }
    });
  }

  ngOnInit(): void {
    this.activeLink = this.router.url;
    this.isHomePage = this.router.url === '/';
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }

  onLinkClick(link: string): void {
    this.router.navigate([link]);
  }
}