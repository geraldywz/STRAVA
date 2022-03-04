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
}
