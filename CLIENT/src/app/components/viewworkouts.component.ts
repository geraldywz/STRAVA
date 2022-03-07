import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Workout } from '../models';
import { WorkoutService } from '../service/workout.service';

@Component({
  selector: 'app-viewworkouts',
  templateUrl: './viewworkouts.component.html',
})
export class ViewworkoutsComponent implements OnInit {
  id!: string;
  workoutList: Workout[] = [];

  constructor(
    private workoutSvc: WorkoutService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.workoutSvc
      .getWorkoutsByUserID(this.id)
      .then((wl) => (this.workoutList = wl))
      .catch((error) => {
        console.log(error);
      });
  }

  presentDateTime(dateTime: number): string {
    var date = new Date(dateTime);
    return date.toLocaleString('en-GB');
  }
}
