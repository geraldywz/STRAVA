import { Injectable } from '@angular/core';

const URL_API_GOOG_MAPS = 'https://maps.googleapis.com/maps/api/js?key=';
const URL_API_ROUTE = '/api/route';

const LAT_SG: number = 1.3521; // lat coords for SG
const LNG_SG: number = 103.8198; // lng coords for SG
const LAT_INC: number = 0.15;
const LNG_INC: number = 0.25;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  private getApi_GoogleMap(): string {
    return 'AIzaSyA9oFEhlrOuOk2CGdHG_9yxHuEjPWd_-0M';
  }

  getURL_GoogleMap(): string {
    return URL_API_GOOG_MAPS.concat(this.getApi_GoogleMap());
  }

  private getBoundaries(): google.maps.LatLngBoundsLiteral {
    return {
      north: LAT_SG + LAT_INC,
      south: LAT_SG - LAT_INC,
      east: LNG_SG + LNG_INC,
      west: LNG_SG - LNG_INC,
    };
  }

  getMapOptions(): google.maps.MapOptions {
    return {
      center: this.getSingaporeCoords(),
      zoom: 12,
      minZoom: 12,
      zoomControl: true,
      restriction: {
        latLngBounds: this.getBoundaries(),
        strictBounds: false,
      },
    };
  }

  getRoute(): google.maps.LatLngLiteral[] {
    // This is a placeholder depiciting what directions would look like when they are rendered on the map.
    const square: google.maps.LatLngLiteral[] = [
      { lat: LAT_SG + 0.0125, lng: LNG_SG + 0.0125 },
      { lat: LAT_SG - 0.0125, lng: LNG_SG + 0.0125 },
      { lat: LAT_SG - 0.0125, lng: LNG_SG - 0.0125 },
      { lat: LAT_SG + 0.0125, lng: LNG_SG - 0.0125 },
      { lat: LAT_SG + 0.0125, lng: LNG_SG + 0.0125 },
    ];
    return square;
  }

  private getSingaporeCoords(): google.maps.LatLngLiteral {
    return { lat: LAT_SG, lng: LNG_SG };
  }
}
