import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public readonly API_USER_ENDPOINT = '/api/user';
  public readonly API_ROUTE_ENDPOINT = '/api/route';
  public readonly API_MAP_ENDPOINT = '/api/map';
  public readonly API_WEATHER_ENDPOINT = '/api/weather';
  public readonly API_WORKOUT_ENDPOINT = '/api/workout';

  public readonly LAT_SG: number = 1.3521; // lat coords for SG
  public readonly LNG_SG: number = 103.8198; // lng coords for SG
  public readonly LAT_INC: number = 0.15;
  public readonly LNG_INC: number = 0.25;

}
