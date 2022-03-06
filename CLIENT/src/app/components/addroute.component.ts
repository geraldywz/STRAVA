import { Route } from './../models';
import { Router, ActivatedRoute } from '@angular/router';
import { MapDirectionsRenderer } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../service/map.service';
import { RouteService } from '../service/route.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-addroute',
  templateUrl: './addroute.component.html',
})
export class AddrouteComponent implements OnInit {
  id!: string;

  //Variables for loading the map.
  directionOptions!: google.maps.DirectionsRendererOptions;
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  mapOptions!: google.maps.MapOptions;

  //Variables for handling the map.
  @ViewChild(MapDirectionsRenderer, { static: false })
  directionsRenderer!: MapDirectionsRenderer;

  //Variables for displaying information about the map.
  waypoints: string[] = [];
  distance: number = 0;
  travelTime: number = 0;

  //Form variables
  name = new FormControl('');

  constructor(
    private mapSvc: MapService,
    private routeSvc: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  //Lifecycle methods

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.mapOptions = this.mapSvc.getMapOptions();
    this.directionOptions = this.mapSvc.getDirectionOptions();
    this.directionsResults$ = this.routeSvc.getDirections();
  }

  //Map methods
  refreshRoute() {
    const render = this.directionsRenderer.getDirections();
    this.waypoints = this.routeSvc.getWaypoints(render);
    this.distance = Number(this.routeSvc.getDistance(render));
  }

  //Utility methods

  addRoute() {
    const r = this.getValue();
    console.log('Submitting >>>>> ' + r.name);
    this.routeSvc
      .addRoute(r)
      .then(() => {
        this.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getValue(): Route {
    return {
      id: 0,
      name: this.name.value,
      waypoints: this.waypoints,
      distance: this.distance,
      user_id: Number(this.id),
    };
  }

  back() {
    this.router.navigate(['user', this.id]);
  }
}
