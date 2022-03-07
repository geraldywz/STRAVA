package tfip.strava.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfip.strava.model.Workout;
import tfip.strava.repo.WorkoutRepository;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    private final Logger logger = LoggerFactory.getLogger(WorkoutService.class);

    @Autowired
    private WorkoutRepository workoutRepo;

    public boolean addWorkout(Workout newWorkout) {
        return workoutRepo.addWorkout(newWorkout);
    }

    public Optional<Workout> getWorkout(int workoutId) {
        return workoutRepo.getWorkout(workoutId);
    }

    public Optional<List<Workout>> getWorkouts(int userId) {
        Optional<List<Workout>> result = Optional.empty();
        List<Workout> workouts = workoutRepo.getWorkouts(userId);
        if (workouts.size() != 0) {
            result = Optional.of(workouts);
        }
        logger.info("WORKOUTS FOUND >>>>> " + workouts.size());
        return result;
    }

}
