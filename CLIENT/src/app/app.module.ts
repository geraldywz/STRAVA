import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteComponent } from './components/route.component';
import { HomeComponent } from './components/home.component';
import { UserService } from './service/user.service';
import { RouteService } from './service/route.service';
import { MapService } from './service/map.service';
import { Constants } from './config/constants';
import { AdduserComponent } from './components/adduser.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, RouteComponent, HomeComponent, AdduserComponent],
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
  providers: [UserService, MapService, RouteService, Constants],
  bootstrap: [AppComponent],
})
export class AppModule {}
