import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { TopPlaylistsComponent } from './top-playlists/top-playlists.component';
import { TopChartsComponent } from './top-charts/top-charts.component';
import { PlaylistsComponent } from './playlist/playlists/playlists.component';
import { AlbumComponent } from './playlist/album/album.component';
import { LoginComponent } from '../../component/Dialog/login/login.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "newReleases", component: NewReleasesComponent },
      { path: "topCharts", component: TopChartsComponent },
      { path: "topPlaylists", component: TopPlaylistsComponent },
      { path: "podCasts", component: PodcastsComponent },
      { path: "topArtists", component: TopArtistsComponent },
      { path: 'playlists/:id', component: PlaylistsComponent },
      { path: 'album/:id', component: AlbumComponent },
    ]
  },
  { path: "login", component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
