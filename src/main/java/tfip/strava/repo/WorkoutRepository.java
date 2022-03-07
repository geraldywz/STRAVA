package tfip.strava.repo;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import tfip.strava.model.Workout;
import tfip.strava.util.ListToStringConverter;

import static tfip.strava.util.SQL.*;

@Repository
public class WorkoutRepository {

    @Autowired
    private JdbcTemplate template;

    private static final Logger logger = LoggerFactory.getLogger(WorkoutRepository.class);

    public boolean addWorkout(Workout workout) {
        final int workoutAdded = template.update(
                SQL_ADD_WORKOUT,
                ListToStringConverter.toString(workout.getWaypoints()),
                workout.getDistance(),
                new Date(workout.getStart()),
                workout.getUser_id());
        logger.info("DB ADDING WORKOUT(" + workout.getId() + ") >>>>> " + (workoutAdded > 0));
        return workoutAdded > 0;
    }

    public Optional<Workout> getWorkout(int workoutId) {
        Optional<Workout> workout = Optional.empty();
        final SqlRowSet rs = template.queryForRowSet(
                SQL_GET_WORKOUTS_BY_WORKOUT_ID,
                workoutId);
        if (rs.next()) {
            workout = Optional.of(Workout.populate(rs));
        }
        logger.info("DB FETCHING WORKOUT >>>>> id: " + workoutId);
        return workout;
    }

    public List<Workout> getWorkouts(int userId) {
        final List<Workout> workouts = new LinkedList<>();
        final SqlRowSet rs = template.queryForRowSet(
                SQL_GET_WORKOUTS_BY_USER_ID,
                userId);
        while (rs.next()) {
            workouts.add(Workout.populate(rs));
        }
        logger.info("DB FETCHING WORKOUTS >>>>> user_id: " + userId);
        return workouts;
    }
}
