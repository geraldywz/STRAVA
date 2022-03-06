package tfip.strava.model;

import org.springframework.jdbc.support.rowset.SqlRowSet;

public class User {

    private int id;
    private String name;
    private String email;

    public User(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static User populate(SqlRowSet rs) {
        return new User(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email"));
    }
}
