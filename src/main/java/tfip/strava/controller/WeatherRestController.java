package tfip.strava.controller;

import static tfip.strava.util.Constants.API_WEATHER_ENDPOINT;

import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tfip.strava.model.Weather;
import tfip.strava.service.WeatherApiService;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping(path = API_WEATHER_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class WeatherRestController {

    private WeatherApiService weatherSvc;

    @GetMapping()
    public ResponseEntity<String> getAllUsers() {
        Optional<List<Weather>> weather = weatherSvc.getWeather();
        if (weather.isEmpty()) {
            log.info("FORECAST >>>>> NOT AVAILABLE.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            log.info("FORECAST >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson()
                            .toJson(weather.get()));
        }
    }
}
