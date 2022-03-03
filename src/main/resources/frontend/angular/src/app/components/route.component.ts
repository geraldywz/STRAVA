import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RouteService } from './../service/route.service';
import { MapService } from './../service/map.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
})
export class RouteComponent implements OnInit {
  //Variables for loading the map
  apiLoaded!: Observable<boolean>;
  options!: google.maps.MapOptions;
  key!: string;

  //Variables for handling the map
  display!: google.maps.LatLngLiteral;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  route!: google.maps.LatLngLiteral[];
  readonly directionsResults$!: Observable<google.maps.DirectionsResult|undefined>;

  constructor(
    private mapSvc: MapService,
    private routeSvc: RouteService,
    http: HttpClient,
    mapDirectionsService: MapDirectionsService
  ) {
    this.routeSvc.getKey().then((apiKey) => {
      this.key = apiKey.key;
      this.apiLoaded = http
        .jsonp(this.mapSvc.generateGMapEndPoint(this.key), 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false))
        );
    });
  }

  ngOnInit(): void {
    this.options = this.mapSvc.getMapOptions();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON(); // Use of non-null assertion operator '!' to suppress the strict null check.
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.route.push(event.latLng!.toJSON());
  }
}
