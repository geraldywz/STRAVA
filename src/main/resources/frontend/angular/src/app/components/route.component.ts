import { GoogleMap, MapDirectionsRenderer } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { RouteService } from './../service/route.service';
import { MapService } from './../service/map.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
})
export class RouteComponent implements OnInit {
  //Variables for loading the map
  mapOptions!: google.maps.MapOptions;
  directionOptions!: google.maps.DirectionsRendererOptions;

  //Variables for handling the map
  display!: google.maps.LatLngLiteral;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapDirectionsRenderer, { static: false })
  directionsRenderer!: MapDirectionsRenderer;
  routeLength: number |undefined;

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(private mapSvc: MapService, private routeSvc: RouteService) {
    this.directionsResults$ = this.routeSvc.getDirections();
  }

  ngOnInit(): void {
    this.mapOptions = this.mapSvc.getMapOptions();
    this.directionOptions = this.mapSvc.getDirectionOptions();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON(); // Use of non-null assertion operator '!' to suppress the strict null check.
  }

  newDirections() {
    this.routeLength = this.directionsRenderer.getDirections()?.routes[0].legs[0].distance?.value;
  }
}
