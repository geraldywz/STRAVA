package tfip.strava.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import tfip.strava.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    public Optional<User> findByName(String name);

}
