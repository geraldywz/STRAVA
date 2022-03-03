import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public readonly API_GMAP_ENDPOINT: string =
    'https://maps.googleapis.com/maps/api/js?key=';
  public readonly API_ROUTE_ENDPOINT = '/api/route';
  public readonly API_MAP_ENDPOINT = '/api/map';

  public readonly LAT_SG: number = 1.3521; // lat coords for SG
  public readonly LNG_SG: number = 103.8198; // lng coords for SG
  public readonly LAT_INC: number = 0.15;
  public readonly LNG_INC: number = 0.25;

  public readonly LAT_ISS: number = 1.2924390256236136;
  public readonly LNG_ISS: number = 103.77662145509424;

  public readonly LAT_HG_MALL: number = 1.372728833840552;
  public readonly LNG_HG_MALL: number = 103.89371176858762;
}
