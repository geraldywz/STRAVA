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

  getDirections(
    waypoints: string[]
  ): Observable<google.maps.DirectionsResult | undefined> {
    const directions = this.mapDirectionsService
      .route(this.generateDirectionRequest(waypoints))
      .pipe(map((response) => response.result));
    return directions;
  }

  getDefaultDirections(): Observable<google.maps.DirectionsResult | undefined> {
    const request = this.generateDirectionRequest([
      'Hougang Mall',
      '25 Heng Mui Keng Terrace',
    ]);
    const directions = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
    return directions;
  }

  private generateDirectionRequest(
    waypoints: string[]
  ): google.maps.DirectionsRequest {
    let start: any = waypoints.shift();
    let end: any = waypoints.pop();
    let result: google.maps.DirectionsRequest = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.BICYCLING,
      avoidHighways: true,
    };
    if (waypoints.length > 0) {
      result.waypoints = this.generateDirectionsWaypoint(waypoints);
    }
    return result;
  }

  private generateDirectionsWaypoint(
    waypoints: string[]
  ): google.maps.DirectionsWaypoint[] {
    let result: google.maps.DirectionsWaypoint[] = [];
    waypoints.forEach((waypoint) => {
      result.push({ location: waypoint, stopover: false });
    });
    return result;
  }

  async getRoutesByUserID(userId: string): Promise<Route[]> {
    const routeList = lastValueFrom(
      this.http.get<Route[]>(
        this.constants.API_ROUTE_ENDPOINT.concat('?user_id=' + userId)
      )
    );
    return routeList;
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
}
