import { map } from 'rxjs/operators';
import { MapDirectionsService } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constants';

@Injectable()
export class RouteService {
  constructor(
    private constants: Constants,
    private http: HttpClient,
    private mapDirectionsService: MapDirectionsService
  ) {}

  getDirections(): Observable<google.maps.DirectionsResult | undefined> {
    const request: google.maps.DirectionsRequest = {
      destination: 'Hougang Mall',
      origin: '25 Heng Mui Keng Terrace',
      travelMode: google.maps.TravelMode.BICYCLING,
    };
    const directions = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
    return directions;
  }

  getNumWaypoints(result: google.maps.DirectionsResult | null): number {
    if (result === null || result?.geocoded_waypoints?.length === undefined) {
      return 0;
    } else {
      return result?.geocoded_waypoints?.length;
    }
  }

  getDistance(result: google.maps.DirectionsResult | null): string {
    if (
      result === null ||
      result?.routes[0].legs[0].distance?.value === undefined
    ) {
      return '0';
    } else {
      return (result?.routes[0].legs[0].distance?.value / 1000).toPrecision(4);
    }
  }
}
