package tfip.strava.controller;

import static tfip.strava.util.Constants.API_WORKOUT_ENDPOINT;

import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tfip.strava.model.Workout;
import tfip.strava.service.WorkoutService;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping(path = API_WORKOUT_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class WorkoutRestController {

    private WorkoutService workoutSvc;

    @GetMapping(path = "/{workout_id}")
    public ResponseEntity<String> getWorkoutsByWorkoutID(@PathVariable String workoutId) {
        Optional<Workout> workout = workoutSvc.getWorkout(Integer.valueOf(workoutId));
        if (workout.isEmpty()) {
            log.info("WORKOUT(" + workoutId + ") >>>>> NOT FOUND.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            log.info("WORKOUT(" + workoutId + ") >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson().toJson(workout.get()));
        }
    }

    @GetMapping()
    public ResponseEntity<String> getWorkoutByUserId(@RequestParam String user_id) {
        Optional<List<Workout>> workouts = workoutSvc.getWorkouts(Integer.valueOf(user_id));
        if (workouts.isEmpty()) {
            log.info("WORKOUTS >>>>> NOT FOUND.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            log.info("WORKOUTS >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson().toJson(workouts.get()));
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addWorkout(@RequestBody String newWorkout) {
        Workout workout = new Gson().fromJson(newWorkout, Workout.class);
        boolean success = workoutSvc.addWorkout(workout);

        if (success) {
            log.info("ADD WORKOUT >>>>> Success.");
            return ResponseEntity
                    .ok()
                    .build();
        } else {
            log.info("ADD WORKOUT >>>>> Failure.");
            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }
}
