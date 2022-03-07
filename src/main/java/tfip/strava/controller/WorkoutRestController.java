package tfip.strava.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static tfip.strava.util.Constants.*;

import java.util.List;
import java.util.Optional;

import com.google.gson.Gson;

import tfip.strava.model.Workout;
import tfip.strava.service.WorkoutService;

@RestController
@RequestMapping(path = API_WORKOUT_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class WorkoutRestController {
    private static final Logger logger = LoggerFactory.getLogger(WorkoutRestController.class);

    @Autowired
    private WorkoutService workoutSvc;

    @GetMapping(path = "/{workout_id}")
    public ResponseEntity<String> getWorkoutsByWorkoutID(@PathVariable String workout_id) {
        Optional<Workout> workout = workoutSvc.getWorkout(Integer.valueOf(workout_id));
        if (workout.isEmpty()) {
            logger.info("WORKOUT(" + workout_id + ") >>>>> NOT FOUND.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            logger.info("WORKOUT(" + workout_id + ") >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson().toJson(workout.get()));
        }
    }

    @GetMapping()
    public ResponseEntity<String> getWorkoutByUserId(@RequestParam String user_id) {
        Optional<List<Workout>> workouts = workoutSvc.getWorkouts(Integer.valueOf(user_id));
        if (workouts.isEmpty()) {
            logger.info("WORKOUTS >>>>> NOT FOUND.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            logger.info("WORKOUTS >>>>> RETRIEVED.");
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
            logger.info("ADD WORKOUT >>>>> Success.");
            return ResponseEntity
                    .ok()
                    .build();
        } else {
            logger.info("ADD WORKOUT >>>>> Failure.");
            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }
}
