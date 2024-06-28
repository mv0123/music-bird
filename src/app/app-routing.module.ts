import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/home/page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: "", pathMatch: 'full', redirectTo: "home" },
  { path: "", loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule) },
  // { path: "communcation", loadChildren: () => import("./communcation/communcation.module").then(m => m.CommuncationModule) },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
