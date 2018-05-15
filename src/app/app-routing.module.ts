import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ConnectComponent } from './connect/connect.component';
import { ExploreComponent } from './explore/explore.component';
import { BrowseComponent } from './browse/browse.component';

const routes : Routes = [
  {
    path:'',
    component: ConnectComponent
  },
  {
    path:'search',
    component: SearchComponent
  },
  {
    path:'explore',
    component: ExploreComponent
  },
  {
    path:'browse',
    component: BrowseComponent
  }
];


@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
