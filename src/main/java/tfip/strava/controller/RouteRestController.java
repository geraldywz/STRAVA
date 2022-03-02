package tfip.strava.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static tfip.strava.util.Constants.*;
import tfip.strava.service.GMapApiService;

@RestController
@RequestMapping(path = API_ROUTE_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class RouteRestController {
    private static final Logger logger = LoggerFactory.getLogger(RouteRestController.class);

    @Autowired
    private GMapApiService gmapApi;

    @GetMapping()
    public ResponseEntity<String> getDirections() {

        String directions = gmapApi.getDirections();
        logger.info("Directions >>>>> " + directions);

        return ResponseEntity
                .ok()
                .body(directions);
    }
}
