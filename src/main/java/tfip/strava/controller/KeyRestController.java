package tfip.strava.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static tfip.strava.util.Constants.*;

import java.util.Optional;

import com.google.gson.Gson;

@RestController
@RequestMapping(path = API_KEY_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
public class KeyRestController {

    private static final Logger logger = LoggerFactory.getLogger(KeyRestController.class);

    @GetMapping()
    public ResponseEntity<String> getApiKey() {
        Optional<String> key = Optional.ofNullable(null);
        if (!key.isEmpty()) {
            logger.info("API KEY >>>>> NOT AVAILABLE.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            logger.info("API KEY >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson()
                            .toJson("AIzaSyDpwt9_2ALr-6IgGg1sDH2HCZdyMRp2pBQ", String.class));
        }
    }
}
