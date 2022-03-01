package tfip.strava.controller;

import com.google.gson.Gson;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tfip.strava.model.Key;

@RestController
@RequestMapping(path = "/api/map", produces = MediaType.APPLICATION_JSON_VALUE)
public class MapRestController {
    private static final Logger logger = LoggerFactory.getLogger(MapRestController.class);

    @GetMapping(value = "/key")
    public ResponseEntity<String> getAPI_Google_Map() {
        logger.info("GMAPS API KEY >>>> HIT");
        return ResponseEntity
                .ok()
                .body(
                        new Gson().toJson(new Key("GOOGLE MAPS API", "AIzaSyA9oFEhlrOuOk2CGdHG_9yxHuEjPWd_-0M")));
    }
}
