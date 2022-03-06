package tfip.strava.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static tfip.strava.util.Constants.*;

import java.util.List;
import java.util.Optional;

import com.google.gson.Gson;

import tfip.strava.model.User;
import tfip.strava.service.UserService;

@RestController
@RequestMapping(path = API_USER_ENDPOINT)
public class UserRestController {

    private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);

    @Autowired
    private UserService userSvc;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addUser(@RequestBody String newUser) {
        User user = new Gson().fromJson(newUser, User.class);
        boolean success = userSvc.addUser(user);
        if (success) {
            logger.info("ADD USER (" + user.getName() + ") >>>>> Success.");
            return ResponseEntity
                    .ok()
                    .build();
        } else {
            logger.info("ADD USER (" + user.getName() + ") >>>>> Failure.");
            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAllUsers() {
        Optional<List<User>> users = userSvc.getAllUsers();
        if (users.isEmpty()) {
            logger.info("USERS >>>>> NOT FOUND.");
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            logger.info("USERS >>>>> RETRIEVED.");
            return ResponseEntity
                    .ok()
                    .body(new Gson().toJson(users.get()));
        }
    }
}
