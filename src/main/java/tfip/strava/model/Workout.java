package tfip.strava.model;

import java.util.List;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import tfip.strava.util.ListToStringConverter;

public class Workout {

    private int id;
    private Long start;
    private List<String> waypoints;
    private double distance;
    private int user_id;

    public Workout(int id, Long start, List<String> waypoints, double distance, int user_id) {
        this.id = id;
        this.start = start;
        this.waypoints = waypoints;
        this.distance = distance;
        this.user_id = user_id;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) { 
        this.id = id;
    }

    public Long getStart() {
        return this.start;
    }

    public void setStart(Long start) {
        this.start = start;
    }

    public List<String> getWaypoints() {
        return this.waypoints;
    }

    public void setWaypoints(List<String> waypoints) {
        this.waypoints = waypoints;
    }

    public double getDistance() {
        return this.distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public int getUser_id() {
        return this.user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public static Workout populate(SqlRowSet rs) {
        return new Workout(
                rs.getInt("id"),
                rs.getDate("start").getTime(),
                ListToStringConverter.toList(rs.getString("waypoints")),
                rs.getDouble("distance"),
                rs.getInt("user_id"));
    }
}
