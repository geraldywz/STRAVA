import { Route, Workout } from '../models';
import { Router, ActivatedRoute } from '@angular/router';
import { MapDirectionsRenderer } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../service/map.service';
import { RouteService } from '../service/route.service';
import { WorkoutService } from '../service/workout.service';

@Component({
  selector: 'app-viewroute',
  templateUrl: './viewroute.component.html',
})
export class ViewrouteComponent implements OnInit {
  id!: string;

  //Variables for loading the map.
  directionOptions!: google.maps.DirectionsRendererOptions;
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  mapOptions!: google.maps.MapOptions;

  //Variables for handling the map.
  @ViewChild(MapDirectionsRenderer, { static: false })
  directionsRenderer!: MapDirectionsRenderer;

  //Variables for displaying information about the map.
  route!: Route;
  workout!: Workout;
  waypoints: string[] = [];
  distance: number = 0;

  constructor(
    private mapSvc: MapService,
    private routeSvc: RouteService,
    private workoutSvc: WorkoutService,
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
      .catch((error) => {
        console.log(error);
      });
    this.mapOptions = this.mapSvc.getMapOptions();
    this.directionOptions = this.mapSvc.getDirectionOptions();
  }

  //Map methods
  refreshRoute() {
    const render = this.directionsRenderer.getDirections();
    this.waypoints = this.routeSvc.getWaypoints(render);
    this.distance = Number(this.routeSvc.getDistance(render));
  }

  //Utility methods
  createWorkout() {
    this.workout = this.getValue();
    this.workoutSvc
      .addWorkout(this.workout)
      .then(() => {
        this.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getValue(): Workout {
    return {
      id: 0,
      start: Date.now(),
      waypoints: this.waypoints,
      distance: this.distance,
      user_id: this.route.user_id,
    };
  }

  back() {
    this.router.navigate(['workout', this.route.user_id]);
  }
}
