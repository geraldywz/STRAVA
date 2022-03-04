import { RouteService } from './service/route.service';
import { Constants } from './config/constants';
import { MapService } from './service/map.service';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouteComponent } from './components/route.component';

@NgModule({
  declarations: [AppComponent, RouteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [MapService, RouteService, Constants],
  bootstrap: [AppComponent],
})
export class AppModule {}
