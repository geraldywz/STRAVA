export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Route {
  id: number;
  name: string;
  waypoints: string[];
  distance: number
  user_id: number;
}

export interface Key {
  name: string;
  key: string;
}
