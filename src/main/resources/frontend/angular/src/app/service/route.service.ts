import { Key } from './../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Constants } from '../config/constants';

@Injectable()
export class RouteService {
  constructor(private constants: Constants, private http: HttpClient) {}

  async getDirections(): Promise<google.maps.DirectionsResult> {
    const directions = lastValueFrom(
      this.http.get<google.maps.DirectionsResult>(
        this.constants.API_ROUTE_ENDPOINT
      )
    );
    return directions;
  }

  async getKey(): Promise<Key> {
    const apiKey = lastValueFrom(
      this.http.get<Key>(this.constants.API_ROUTE_ENDPOINT.concat('/key'))
    );
    return apiKey;
  }
}
