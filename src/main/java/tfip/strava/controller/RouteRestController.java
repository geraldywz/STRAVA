package tfip.strava.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static tfip.strava.util.Constants.*;

import java.util.List;
import java.util.Optional;

import com.google.gson.Gson;

import tfip.strava.model.Key;
import tfip.strava.model.Route;
import tfip.strava.service.GMapApiService;
import tfip.strava.service.RouteService;

@RestController
@RequestMapping(path = API_ROUTE_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class RouteRestController {
    private static final Logger logger = LoggerFactory.getLogger(RouteRestController.class);

    @Autowired
    private GMapApiService gmapApi;

    @Autowired
    private RouteService routeSvc;

    @GetMapping(path = "/{route_id}")
    public ResponseEntity<String> getRoutesByRouteID(@PathVariable String route_id) {
        Optional<Route> route = routeSvc.getRoute(Integer.valueOf(route_id));
        if (route.isEmpty()) {
            logger.info("ROUTE(" + route_id + ") >>>>> NOT FOUND.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            logger.info("ROUTE(" + route_id + ") >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson().toJson(route.get()));
        }
    }

    @GetMapping()
    public ResponseEntity<String> getRouteByUserId(@RequestParam String user_id) {
        Optional<List<Route>> routes = routeSvc.getRoutes(Integer.valueOf(user_id));
        if (routes.isEmpty()) {
            logger.info("ROUTES >>>>> NOT FOUND.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            logger.info("ROUTES >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson().toJson(routes.get()));
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addRoute(@RequestBody String newRoute) {
        Route route = new Gson().fromJson(newRoute, Route.class);
        boolean success = routeSvc.addRoute(route);
        if (success) {
            logger.info("ADD ROUTE (" + route.getName() + ") >>>>> Success.");
            return ResponseEntity
                    .ok()
                    .build();
        } else {
            logger.info("ADD ROUTE (" + route.getName() + ") >>>>> Failure.");
            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }

    @GetMapping(value = "/directions")
    public ResponseEntity<String> getDirections() {

        logger.info("RETREIVING DIRECTIONS");
        String directions = gmapApi.getDirections("Hougang Mall", "25 Heng Mui Keng Terrace",
                new String[] { "Bishan Park", "Singapore Botanic Gardens" });
        return ResponseEntity
                .ok()
                .body(directions);
    }

    @GetMapping(value = "/key")
    public ResponseEntity<String> getKey() {

        return ResponseEntity
                .ok()
                .body(new Gson().toJson(new Key("Key", KEY_GMAP_DIRECTIONS)));
    }
}
