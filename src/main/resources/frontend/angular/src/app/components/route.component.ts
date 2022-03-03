import { GoogleMap } from '@angular/google-maps';
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
  options!: google.maps.MapOptions;

  //Variables for handling the map
  display!: google.maps.LatLngLiteral;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  route!: google.maps.LatLngLiteral[];
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(private mapSvc: MapService, private routeSvc: RouteService) {
    this.directionsResults$ = this.routeSvc.getDirections();
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
