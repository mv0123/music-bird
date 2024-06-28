import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RadioComponent } from './radio/radio.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { PlayerComponent } from '../../component/player/player.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from '../../component/Dialog/login/login.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { TopChartsComponent } from './top-charts/top-charts.component';
import { TopPlaylistsComponent } from './top-playlists/top-playlists.component';
import { PlaylistsComponent } from './playlist/playlists/playlists.component';
import { AlbumComponent } from './playlist/album/album.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    PodcastsComponent,
    RadioComponent,
    NewReleasesComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    PlayerComponent,
    LoginComponent,
    TopArtistsComponent,
    TopChartsComponent,
    TopPlaylistsComponent,
    PlaylistsComponent,
    AlbumComponent,
        PodcastsComponent,

    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTabsModule,
    ButtonModule,
    FormsModule
  ]
})
export class HomeModule { }
