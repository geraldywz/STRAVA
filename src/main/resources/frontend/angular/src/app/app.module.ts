import { Constants } from './config/constants';
import { MapService } from './service/map.service';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map.component';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [MapService, Constants],
  bootstrap: [AppComponent],
})
export class AppModule {}
