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

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Service
public class WeatherApiService {

    private final Logger logger = LoggerFactory.getLogger(WeatherApiService.class);

    public Optional<List<Weather>> getWeather() {
        Optional<List<Weather>> weather = Optional.empty();
        final String url = generateURI();
        logger.info("OWM API URL >>>>> " + url);
        try {
            weather = Optional.of(process(
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
                .fromUriString(URL_NEA_2HR_ENDPOINT)
                .toUriString();
    }

    private List<Weather> process(String json) {
        List<Weather> weatherMap = new LinkedList<>();
        JsonObject neaWeather = JsonParser
                .parseString(json)
                .getAsJsonObject();

        JsonArray metadata = neaWeather.get("area_metadata").getAsJsonArray();
        for (JsonElement jsonElement : metadata) {
            JsonObject w = jsonElement.getAsJsonObject();
            weatherMap.add(
                    new Weather(
                            w.get("name")
                                    .getAsString(),
                            w.get("label_location")
                                    .getAsJsonObject()
                                    .get("latitude")
                                    .getAsDouble(),
                            w.get("label_location")
                                    .getAsJsonObject()
                                    .get("longitude")
                                    .getAsDouble()));
        }

        Timestamp now = new Timestamp(
                new java.util.Date()
                        .getTime());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");

        JsonArray items = neaWeather.get("items").getAsJsonArray();
        for (JsonElement jsonElement : items) {
            JsonObject v = jsonElement
                    .getAsJsonObject()
                    .get("valid_period")
                    .getAsJsonObject();
            ZonedDateTime start = ZonedDateTime.parse(
                    v.get("start").getAsString(),
                    formatter);
            ZonedDateTime end = ZonedDateTime.parse(
                    v.get("end").getAsString(),
                    formatter);
            if (start.toLocalDateTime().isBefore(now.toLocalDateTime()) &&
                    end.toLocalDateTime().isAfter(now.toLocalDateTime())) {
                JsonArray x = jsonElement
                        .getAsJsonObject()
                        .get("forecasts")
                        .getAsJsonArray();
                for (int i = 0; i < x.size(); i++) {
                    String forecast = x.get(i)
                            .getAsJsonObject()
                            .get("forecast")
                            .getAsString();
                    weatherMap
                            .get(i)
                            .setForecast(forecast);
                }
                break;
            }
        }
        return weatherMap;
    }

}