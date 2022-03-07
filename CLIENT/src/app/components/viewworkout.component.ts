import { WorkoutService } from '../service/workout.service';
import { Marker, Workout } from '../models';
import { Router, ActivatedRoute } from '@angular/router';
import { MapDirectionsRenderer } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../service/map.service';
import { RouteService } from '../service/route.service';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-viewworkout',
  templateUrl: './viewworkout.component.html',
})
export class ViewworkoutComponent implements OnInit {
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

  //Variables for displaying information about the map.
  workout!: Workout;
  waypoints: string[] = [];
  distance: number = 0;

  constructor(
    private mapSvc: MapService,
    private routeSvc: RouteService,
    private weatherSvc: WeatherService,
    private workoutSvc: WorkoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  //Lifecycle methods
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.workoutSvc
      .getWorkoutByWorkoutID(this.id)
      .then((w) => {
        this.workout = w;
        this.directionsResults$ = this.routeSvc.getDirections(
          this.workout.waypoints
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

  back() {
    this.router.navigate(['user', this.id]);
  }

  presentDateTime(dateTime: number): string {
    var date = new Date(dateTime);
    return date.toLocaleString('en-GB');
  }
}
