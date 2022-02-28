import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private latSG: number = 1.3521; // lat coords for SG
  private lngSG: number = 103.8198; // lng coords for SG
  private latVar: number = 0.15;
  private lngVar: number = 0.25;
  constructor() {}

  private getBoundaries(): google.maps.LatLngBoundsLiteral {
    return {
      north: this.latSG + this.latVar,
      south: this.latSG - this.latVar,
      east: this.lngSG + this.lngVar,
      west: this.lngSG - this.lngVar,
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
      { lat: this.latSG + 0.0125, lng: this.lngSG + 0.0125 },
      { lat: this.latSG - 0.0125, lng: this.lngSG + 0.0125 },
      { lat: this.latSG - 0.0125, lng: this.lngSG - 0.0125 },
      { lat: this.latSG + 0.0125, lng: this.lngSG - 0.0125 },
      { lat: this.latSG + 0.0125, lng: this.lngSG + 0.0125 },
    ];
    return square;
  }

  private getSingaporeCoords(): google.maps.LatLngLiteral {
    return { lat: this.latSG, lng: this.lngSG };
  }
}
