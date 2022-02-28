import { MapService } from './../service/map.service';
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

  route: google.maps.LatLngLiteral[] = this.mapSvc.getRoute();
  options: google.maps.MapOptions = this.mapSvc.getMapOptions();

  constructor(private mapSvc: MapService, private httpClient: HttpClient) {
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
