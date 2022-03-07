import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdduserComponent } from './components/adduser.component';
import { ViewroutesComponent } from './components/viewroutes.component';
import { AddrouteComponent } from './components/addroute.component';
import { AddworkoutComponent } from './components/addworkout.component';
import { ViewrouteComponent } from './components/viewroute.component';
import { RouteComponent } from './components/route.component';
import { HomeComponent } from './components/home.component';
import { UserService } from './service/user.service';
import { RouteService } from './service/route.service';
import { MapService } from './service/map.service';
import { WeatherService } from './service/weather.service';
import { Constants } from './config/constants';

@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    HomeComponent,
    AdduserComponent,
    ViewroutesComponent,
    AddrouteComponent,
    AddworkoutComponent,
    ViewrouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [UserService, MapService, RouteService, WeatherService, Constants],
  bootstrap: [AppComponent],
})
export class AppModule {}
