import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';

@Injectable()
export class MapService {
  constructor(private constants: Constants, private http: HttpClient) {}

  private getBoundaries(): google.maps.LatLngBoundsLiteral {
    return {
      north: this.constants.LAT_SG + this.constants.LAT_INC,
      south: this.constants.LAT_SG - this.constants.LAT_INC,
      east: this.constants.LNG_SG + this.constants.LNG_INC,
      west: this.constants.LNG_SG - this.constants.LNG_INC,
    };
  }

  getDirectionOptions(): google.maps.DirectionsRendererOptions {
    const options: google.maps.DirectionsRendererOptions = {
      draggable: true,
    };
    return options;
  }

  getMapOptions(): google.maps.MapOptions {
    return {
      center: this.getSingapore(),
      zoom: 12,
      minZoom: 12,
      zoomControl: true,
      restriction: {
        latLngBounds: this.getBoundaries(),
        strictBounds: false,
      },
    };
  }

  getSingapore(): google.maps.LatLngLiteral {
    return { lat: this.constants.LAT_SG, lng: this.constants.LNG_SG };
  }
}
