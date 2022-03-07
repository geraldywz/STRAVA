import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Constants } from '../config/constants';
import { Weather } from '../models';

@Injectable()
export class WeatherService {
  constructor(private constants: Constants, private http: HttpClient) {}

  async getWeather(): Promise<Weather[]> {
    const weatherList = lastValueFrom(
      this.http.get<Weather[]>(this.constants.API_WEATHER_ENDPOINT)
    );
    return weatherList;
  }
}
