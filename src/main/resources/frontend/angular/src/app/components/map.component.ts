import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  gMapsLoaded: Observable<boolean>;

  display!: google.maps.LatLngLiteral;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  markerOptions: google.maps.MarkerOptions = { draggable: false };

  latSG: number = 1.3521; // lat coords for SG
  lngSG: number = 103.8198; // lng coords for SG
  latVar: number = 0.15;
  lngVar: number = 0.25;

  SINGAPORE_BOUNDS = {
    north: this.latSG + this.latVar,
    south: this.latSG - this.latVar,
    east: this.lngSG + this.lngVar,
    west: this.lngSG - this.lngVar,
  };

  options: google.maps.MapOptions = {
    center: { lat: this.latSG, lng: this.lngSG },
    zoom: 12,
    minZoom: 12,
    zoomControl: true,
    restriction: {
      latLngBounds: this.SINGAPORE_BOUNDS,
      strictBounds: false,
    },
  };

  route: google.maps.LatLngLiteral[] = [
    // This is a sample polyline depiciting what directions would look like when they are rendered on the map.
    { lat: this.latSG + 0.0125, lng: this.lngSG + 0.0125 },
    { lat: this.latSG - 0.0125, lng: this.lngSG + 0.0125 },
    { lat: this.latSG - 0.0125, lng: this.lngSG - 0.0125 },
    { lat: this.latSG + 0.0125, lng: this.lngSG - 0.0125 },
    { lat: this.latSG + 0.0125, lng: this.lngSG + 0.0125 },
  ];

  constructor(httpClient: HttpClient) {
    this.gMapsLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9oFEhlrOuOk2CGdHG_9yxHuEjPWd_-0M',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {}

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON(); // Use of non-null assertion operator '!' to suppress the strict null check.
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.route.push(event.latLng!.toJSON());
  }
}
