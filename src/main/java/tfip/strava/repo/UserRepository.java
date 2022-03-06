package tfip.strava.repo;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import tfip.strava.model.User;

import static tfip.strava.util.SQL.*;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate template;

    private static final Logger logger = LoggerFactory.getLogger(UserRepository.class);

    public List<User> getAllUsers() {
        final List<User> users = new LinkedList<>();
        final SqlRowSet rs = template.queryForRowSet(
                SQL_GET_ALL_USERS);
        while (rs.next()) {
            users.add(User.populate(rs));
        }
        logger.info("DB FETCHING USERS >>>>> ALL");
        return users;
    }

    public Optional<User> findByName(String name) {
        Optional<User> result = Optional.empty();
        final SqlRowSet rs = template.queryForRowSet(
                SQL_FIND_USER_BY_NAME, name);
        if (rs.next()) {
            result = Optional.of(User.populate(rs));
        }
        logger.info("DB FETCHING USER(" + name + ") >>>>> " + result.isPresent());
        return result;
    }

    public boolean addUser(User user) {
        final int userAdded = template.update(SQL_ADD_USER, user.getName(), user.getEmail());
        logger.info("DB ADDING USER(" + user.getName() + ") >>>>> " + (userAdded > 0));
        return userAdded > 0;
    }
}
