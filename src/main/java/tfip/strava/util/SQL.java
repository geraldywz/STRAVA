package tfip.strava.util;

public class SQL {
    public static final String SQL_ADD_ROUTE = "INSERT INTO routes (name, waypoints, distance, user_id) VALUES (?, ?, ?, ?)";
    public static final String SQL_ADD_USER = "INSERT INTO users (name, email) VALUES (?, ?)";

    public static final String SQL_GET_ALL_USERS = "SELECT * FROM users";

    public static final String SQL_GET_USER_BY_NAME = "SELECT * FROM users WHERE name LIKE ?";

    public static final String SQL_GET_ROUTES_BY_USER_ID = "SELECT * FROM routes WHERE user_id = ?";

}
