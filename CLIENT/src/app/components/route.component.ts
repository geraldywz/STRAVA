import { GoogleMap, MapDirectionsRenderer } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { RouteService } from '../service/route.service';
import { MapService } from '../service/map.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
})
export class RouteComponent implements OnInit {
  //Variables for loading the map.
  directionOptions!: google.maps.DirectionsRendererOptions;
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  mapOptions!: google.maps.MapOptions;

  //Variables for handling the map.
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapDirectionsRenderer, { static: false })
  directionsRenderer!: MapDirectionsRenderer;

  //Variables for displaying information about the map.
  display: google.maps.LatLngLiteral = this.mapSvc.getSingapore();
  waypoints: number = 0;
  distance!: string;

  constructor(private mapSvc: MapService, private routeSvc: RouteService) {}

  ngOnInit(): void {
    this.mapOptions = this.mapSvc.getMapOptions();
    this.directionOptions = this.mapSvc.getDirectionOptions();
    this.directionsResults$ = this.routeSvc.getDefaultDirections();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON(); // Use of non-null assertion operator '!' to suppress the strict null check.
  }

  refreshRoute() {
    const render = this.directionsRenderer.getDirections();
    // this.waypoints = this.routeSvc.getNumWaypoints(render);
    this.distance = this.routeSvc.getDistance(render);
    if (render?.geocoded_waypoints) {
    }
  }
}
