import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { TvListComponent } from './tv-list/tv-list.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';

const routes: Routes = [
  {path:"", component:WelcomeComponent},
  {path:"discovery", component:TvListComponent},
  {path:"discovery/:keyword", component:TvListComponent},
  {path:"tv/:id", component:TvDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
