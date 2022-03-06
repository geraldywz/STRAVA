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

import tfip.strava.model.Route;
import tfip.strava.util.ListToStringConverter;

import static tfip.strava.util.SQL.*;

@Repository
public class RouteRepository {

    @Autowired
    private JdbcTemplate template;

    private static final Logger logger = LoggerFactory.getLogger(RouteRepository.class);

    public List<Route> getRoutes(int userId) {
        final List<Route> routes = new LinkedList<>();
        final SqlRowSet rs = template.queryForRowSet(
                SQL_GET_ROUTES_BY_USER_ID,
                userId);
        while (rs.next()) {
            routes.add(Route.populate(rs));
        }
        logger.info("DB FETCHING ROUTES >>>>> user_id: " + userId);
        return routes;
    }

    public boolean addRoute(Route route) {
        final int routeAdded = template.update(
                SQL_ADD_ROUTE,
                route.getName(),
                ListToStringConverter.toString(route.getWaypoints()),
                route.getDistance(),
                route.getUser_id());
        logger.info("DB ADDING ROUTE(" + route.getName() + ") >>>>> " + (routeAdded > 0));
        return routeAdded > 0;
    }

}
