import { MapService } from '../service/map.service';
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
  route!: google.maps.LatLngLiteral[];
  options!: google.maps.MapOptions;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(private mapSvc: MapService, private http: HttpClient) {
    this.gMapsLoaded = http.jsonp(this.mapSvc.getAPI_GMap(), 'callback').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  ngOnInit(): void {
    this.route = this.mapSvc.getRoute();
    this.options = this.mapSvc.getMapOptions();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON(); // Use of non-null assertion operator '!' to suppress the strict null check.
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.route.push(event.latLng!.toJSON());
  }
}
