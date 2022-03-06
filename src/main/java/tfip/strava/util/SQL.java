package tfip.strava.util;

public class SQL {
    public static final String SQL_GET_ALL_USERS = "SELECT * FROM users";

    public static final String SQL_FIND_USER_BY_NAME = "SELECT * FROM users WHERE name LIKE ?";

    public static final String SQL_ADD_USER = "INSERT INTO users (name, email) VALUES (?, ?)";

    public static final String SQL_GET_ALL_BOOKS_BY_LIMIT_OFFSET = "SELECT * FROM book2018 LIMIT ? OFFSET ?";

    public static final String SQL_GET_BOOKS_FORMAT = "SELECT DISTINCT(format) FROM book2018 WHERE format NOT LIKE ''";

    public static final String SQL_GET_BOOKS_FORMAT_COUNT = "SELECT COUNT(*) AS formats from book2018 WHERE FORMAT LIKE ?";
}
