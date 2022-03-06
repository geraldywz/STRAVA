package tfip.strava.model;

import java.util.List;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import tfip.strava.util.ListToStringConverter;

public class Route {

    private int id;
    private String name;
    private List<String> waypoints;
    private double distance;
    private int user_id;

    public Route() {
    }

    public Route(int id, String name, List<String> waypoints, double distance, int user_id) {
        this.id = id;
        this.name = name;
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

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public static Route populate(SqlRowSet rs) {
        return new Route(
                rs.getInt("id"),
                rs.getString("name"),
                ListToStringConverter.toList(rs.getString("waypoints")),
                rs.getDouble("distance"),
                rs.getInt("user_id"));
    }
}
