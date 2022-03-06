package tfip.strava.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfip.strava.model.User;
import tfip.strava.repo.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepo;

    public boolean addUser(User newUser) {
        boolean success = false;
        success = userRepo.findByName(newUser.getName()).isEmpty();
        if (success) {
            userRepo.save(newUser);
        }
        return success;
    }

    public Optional<List<User>> getAllUsers() {
        Optional<List<User>> result = Optional.empty();
        List<User> users = userRepo.findAll();
        if (users.size() != 0) {
            result = Optional.of(users);

        }
        logger.info("USERS FOUND >>>>> " + users.size());
        return result;
    }
}
