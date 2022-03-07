package tfip.strava.model;

public class Weather {

    private String name;
    private String forecast;
    private double lat;
    private double lng;

    public Weather() {
    }

    public Weather(String name, double lat, double lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getForecast() {
        return this.forecast;
    }

    public void setForecast(String forecast) {
        this.forecast = forecast;
    }

    public double getLat() {
        return this.lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return this.lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

}
