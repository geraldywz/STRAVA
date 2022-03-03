import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';

@Injectable()
export class MapService {
  constructor(private constants: Constants, private http: HttpClient) {}

  generateGMapEndPoint(key: string) {
    return this.constants.API_GMAP_ENDPOINT.concat(key);
  }

  private getBoundaries(): google.maps.LatLngBoundsLiteral {
    return {
      north: this.constants.LAT_SG + this.constants.LAT_INC,
      south: this.constants.LAT_SG - this.constants.LAT_INC,
      east: this.constants.LNG_SG + this.constants.LNG_INC,
      west: this.constants.LNG_SG - this.constants.LNG_INC,
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
    let square: google.maps.LatLngLiteral[] = [
      {
        lat: this.constants.LAT_SG + 0.0125,
        lng: this.constants.LNG_SG + 0.0125,
      },
      {
        lat: this.constants.LAT_SG - 0.0125,
        lng: this.constants.LNG_SG + 0.0125,
      },
      {
        lat: this.constants.LAT_SG - 0.0125,
        lng: this.constants.LNG_SG - 0.0125,
      },
      {
        lat: this.constants.LAT_SG + 0.0125,
        lng: this.constants.LNG_SG - 0.0125,
      },
      {
        lat: this.constants.LAT_SG + 0.0125,
        lng: this.constants.LNG_SG + 0.0125,
      },
    ];
    return square;
  }

  private getSingaporeCoords(): google.maps.LatLngLiteral {
    return { lat: this.constants.LAT_SG, lng: this.constants.LNG_SG };
  }
}
