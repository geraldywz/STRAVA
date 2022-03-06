package tfip.strava.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfip.strava.model.Route;
import tfip.strava.repo.RouteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    private final Logger logger = LoggerFactory.getLogger(RouteService.class);

    @Autowired
    private RouteRepository routeRepo;

    public Optional<List<Route>> getRoutes(int userId) {
        Optional<List<Route>> result = Optional.empty();
        List<Route> users = routeRepo.getRoutes(userId);
        if (users.size() != 0) {
            result = Optional.of(users);
        }
        logger.info("ROUTES FOUND >>>>> " + users.size());
        return result;
    }

    public boolean addRoute(Route newRoute) {
        return routeRepo.addRoute(newRoute);
    }
}
