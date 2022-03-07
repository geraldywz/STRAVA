package tfip.strava.model;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Weather {

    private static final Logger logger = LoggerFactory.getLogger(Weather.class);

    private String description;
    private double temp;

    public Weather() {
    }

    public Weather(String description, double temp) {
        this.description = description;
        this.temp = temp;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getTemp() {
        return this.temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public static Weather toWeather(String json) {
        JsonObject openWeather = JsonParser
                .parseString(json)
                .getAsJsonObject();
        return new Weather(
                openWeather
                        .get("weather")
                        .getAsJsonArray()
                        .get(0)
                        .getAsJsonObject()
                        .get("description")
                        .getAsString(),

                openWeather
                        .get("main")
                        .getAsJsonObject()
                        .get("temp")
                        .getAsDouble());
    }
}
