package tfip.strava;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class STRAVA {

	public static void main(String[] args) {
		Logger logger = LoggerFactory.getLogger(SpringBootApplication.class);
		logger.info("SYSENV >>>>> " + System.getenv("DO_USER"));
		SpringApplication.run(STRAVA.class, args);
	}

}