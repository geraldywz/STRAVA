import { ViewroutesComponent } from './components/viewroutes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { AdduserComponent } from './components/adduser.component';
import { AddrouteComponent } from './components/addroute.component';
import { AddworkoutComponent } from './components/addworkout.component';
import { ViewrouteComponent } from './components/viewroute.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/add', component: AdduserComponent },
  { path: 'user/:id', component: ViewroutesComponent },
  { path: 'workout/new/:id', component: AddworkoutComponent },
  { path: 'route/:id', component: ViewrouteComponent },
  { path: 'route/new/:id', component: AddrouteComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
