import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { RouteComponent } from './components/route.component';
import { RouteService } from './service/route.service';
import { MapService } from './service/map.service';
import { Constants } from './config/constants';

@NgModule({
  declarations: [AppComponent, RouteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [MapService, RouteService, Constants],
  bootstrap: [AppComponent],
})
export class AppModule {}
