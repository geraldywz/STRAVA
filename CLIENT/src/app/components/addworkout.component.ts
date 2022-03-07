import { Marker, Route, Weather } from '../models';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MapDirectionsRenderer,
  MapMarker,
  GoogleMap,
} from '@angular/google-maps';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../service/map.service';
import { RouteService } from '../service/route.service';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
})
export class AddworkoutComponent implements OnInit {
  id!: string;

  //Variables for loading the map.
  directionOptions!: google.maps.DirectionsRendererOptions;
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  mapOptions!: google.maps.MapOptions;
  markerArray: Marker[] = [];
  markerOptions!: google.maps.MarkerOptions;

  //Variables for handling the map.
  @ViewChild(MapDirectionsRenderer, { static: false })
  directionsRenderer!: MapDirectionsRenderer;
  @ViewChild(MapMarker, { static: false })
  mapMarker!: MapMarker;
  @ViewChild(GoogleMap, { static: false })
  map!: GoogleMap;

  //Variables for displaying information about the map.
  route!: Route;
  waypoints: string[] = [];
  distance: number = 0;

  constructor(
    private mapSvc: MapService,
    private routeSvc: RouteService,
    private weatherSvc: WeatherService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  //Lifecycle methods
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.routeSvc
      .getRouteByRouteID(this.id)
      .then((r) => {
        this.route = r;
        this.directionsResults$ = this.routeSvc.getDirections(
          this.route.waypoints
        );
      })
      .then(() => {
        this.weatherSvc
          .getWeather()
          .then((w) => {
            w.forEach((weather) => {
              this.markerArray.push({
                name: weather.name,
                forecast: weather.forecast,
                coords: { lat: weather.lat, lng: weather.lng },
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    this.mapOptions = this.mapSvc.getMapOptions();
    this.directionOptions = this.mapSvc.getDirectionOptions();
    this.markerOptions = this.mapSvc.getMarkerOptions();
  }

  //Map methods
  refreshRoute() {
    const render = this.directionsRenderer.getDirections();
    this.waypoints = this.routeSvc.getWaypoints(render);
    this.distance = Number(this.routeSvc.getDistance(render));
  }

  //Utility methods
  editRoute() {
    this.route = this.getValue();
    this.routeSvc
      .addRoute(this.route)
      .then(() => {
        this.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getValue(): Route {
    return {
      id: this.route.id,
      name: this.route.name,
      waypoints: this.waypoints,
      distance: this.distance,
      user_id: this.route.user_id,
    };
  }

  back() {
    this.router.navigate(['user', this.id]);
  }
}
