export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Route {
  id: number;
  name: string;
  waypoints: string[];
  distance: number;
  user_id: number;
}

export interface Weather {
  name: string;
  forecast: string;
  lat: number;
  lng: number;
}

export interface Marker {
  name: string;
  forecast: string;
  coords: google.maps.LatLngLiteral;
}
