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

import java.util.Optional;

import com.google.gson.Gson;

import tfip.strava.model.Weather;
import tfip.strava.service.WeatherApiService;

@RestController
@RequestMapping(path = API_WEATHER_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class WeatherRestController {

    private static final Logger logger = LoggerFactory.getLogger(WeatherRestController.class);

    @Autowired
    private WeatherApiService weatherSvc;

    @GetMapping()
    public ResponseEntity<String> getAllUsers() {
        Optional<Weather> weather = weatherSvc.getWeather();
        if (weather.isEmpty()) {
            logger.info("FORECAST >>>>> NOT AVAILABLE.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            logger.info("FORECAST >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson()
                            .toJson(weather.get()));
        }
    }
}
