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
import { AddrouteComponent } from './components/addroute.component';
import { ViewrouteComponent } from './components/viewroute.component';
import { ViewroutesComponent } from './components/viewroutes.component';
import { ViewworkoutComponent } from './components/viewworkout.component';
import { ViewworkoutsComponent } from './components/viewworkouts.component';
import { RouteComponent } from './components/route.component';
import { HomeComponent } from './components/home.component';
import { UserService } from './service/user.service';
import { RouteService } from './service/route.service';
import { MapService } from './service/map.service';
import { WeatherService } from './service/weather.service';
import { WorkoutService } from './service/workout.service';
import { Constants } from './config/constants';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    HomeComponent,
    AdduserComponent,
    ViewroutesComponent,
    AddrouteComponent,
    ViewrouteComponent,
    ViewworkoutComponent,
    ViewworkoutsComponent,
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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    UserService,
    MapService,
    RouteService,
    WeatherService,
    WorkoutService,
    Constants,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
