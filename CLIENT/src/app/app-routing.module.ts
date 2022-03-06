import { RouteComponent } from './components/route.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { AdduserComponent } from './components/adduser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/add', component: AdduserComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
