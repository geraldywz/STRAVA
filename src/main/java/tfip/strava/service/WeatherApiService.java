package tfip.strava.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import tfip.strava.model.Weather;

import static tfip.strava.util.Constants.*;

import java.util.Objects;
import java.util.Optional;

@Service
public class WeatherApiService {

    private final Logger logger = LoggerFactory.getLogger(WeatherApiService.class);

    private final String appId;

    public WeatherApiService() {
        // appId = System.getenv(ENV_OPENWEATHERMAP_KEY);
        appId = "a785a8a212098474da9f29d61abc06cf";
        logger.info("OWM API KEY >>>>> " + appId);
        if (Objects.isNull(appId) || appId.length() == 0) {
            logger.warn("OWM Key is not set".formatted(ENV_OPENWEATHERMAP_KEY));
        }
    }

    public Optional<Weather> getWeather() {
        Optional<Weather> weather = Optional.empty();
        final String url = generateURI();
        logger.info("OWM API URL >>>>> " + url);
        try {
            weather = Optional.of(Weather.toWeather(
                    getResponse(url)));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return weather;
    }

    private String getResponse(String url) {
        String json = null;
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Request request = new Request.Builder()
                .url(url)
                .method("GET", null)
                .build();

        try (Response response = client.newCall(request).execute()) {
            json = response.body().string();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return json;
    }

    private String generateURI() {
        return UriComponentsBuilder
                .fromUriString(URL_OPENWEATHERMAP_ENDPOINT)
                .queryParam("q", "Singapore")
                .queryParam("units", "metric")
                .queryParam("appid", appId)
                .toUriString();
    }

}