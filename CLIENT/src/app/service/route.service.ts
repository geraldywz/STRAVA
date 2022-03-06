import { map } from 'rxjs/operators';
import { MapDirectionsService } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Constants } from '../config/constants';
import { Route } from '../models';

@Injectable()
export class RouteService {
  constructor(
    private constants: Constants,
    private http: HttpClient,
    private mapDirectionsService: MapDirectionsService
  ) {}

  async addRoute(route: Partial<Route>) {
    return await lastValueFrom(
      this.http.post<any>(this.constants.API_ROUTE_ENDPOINT, route)
    );
  }

  async getRouteByUserID(userId: string): Promise<Route[]> {
    const routeList = lastValueFrom(
      this.http.get<Route[]>(
        this.constants.API_ROUTE_ENDPOINT.concat('/uid/' + userId)
      )
    );
    return routeList;
  }

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

  getWaypoints(result: google.maps.DirectionsResult | null): string[] {
    let waypoints: string[] = [];
    if (result != null && result?.geocoded_waypoints?.length != undefined) {
      for (let i = 0; i < result?.geocoded_waypoints?.length; i++) {
        let placeId: any = result?.geocoded_waypoints[i].place_id;
        waypoints.push(placeId);
      }
    }
    return waypoints;
  }

  getDistance(result: google.maps.DirectionsResult | null): string {
    if (
      result === null ||
      result?.routes[0].legs[0].distance?.value === undefined
    ) {
      return '0';
    } else {
      return (result?.routes[0].legs[0].distance?.value / 1000).toFixed(2);
    }
  }
}
