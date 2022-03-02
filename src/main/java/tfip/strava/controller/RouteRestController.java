package tfip.strava.controller;

import com.google.gson.Gson;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static tfip.strava.util.Constants.*;
import tfip.strava.model.Key;

@RestController
@RequestMapping(path = API_ROUTE_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class RouteRestController {
    private static final Logger logger = LoggerFactory.getLogger(RouteRestController.class);

    @GetMapping()
    public ResponseEntity<String> getDirections() {
        
        return ResponseEntity
                .ok()
                .body(
                        new Gson().toJson(new Key("GOOGLE MAPS API", "AIzaSyA9oFEhlrOuOk2CGdHG_9yxHuEjPWd_-0M")));
    }
}
