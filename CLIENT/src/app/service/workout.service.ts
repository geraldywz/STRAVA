import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Workout } from '../models';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private constants: Constants, private http: HttpClient) {}

  async addWorkout(workout: Partial<Workout>) {
    return await lastValueFrom(
      this.http.post<any>(this.constants.API_WORKOUT_ENDPOINT, workout)
    );
  }

  async getWorkoutByWorkoutID(workoutId: string): Promise<Workout> {
    const workout = lastValueFrom(
      this.http.get<Workout>(
        this.constants.API_WORKOUT_ENDPOINT.concat('/' + workoutId)
      )
    );
    return workout;
  }

  async getWorkoutsByUserID(userId: string): Promise<Workout[]> {
    const workoutList = lastValueFrom(
      this.http.get<Workout[]>(
        this.constants.API_WORKOUT_ENDPOINT.concat('?user_id=' + userId)
      )
    );
    return workoutList;
  }
}
