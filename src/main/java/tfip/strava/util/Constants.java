package tfip.strava.util;

public class Constants {

    // API Related

    public static final String API_ROUTE_ENDPOINT = "/api/route";
    public static final String API_MAP_ENDPOINT = "/api/map";

    // GMAPS Specific
    public static final String URL_GMAPS_DIRECTIONS_ENDPOINT = "https://maps.googleapis.com/maps/api/directions/json?";
    public static final String PARAM_AVOID = "highways";
    public static final String PARAM_MODE = "bicycling";
    public static final String KEY_GMAP_DIRECTIONS = "AIzaSyDpwt9_2ALr-6IgGg1sDH2HCZdyMRp2pBQ";

    // MARKED FOR DEPRECATION

    public static final String URL_OPENLIBRARY = "http://openlibrary.org/";

    public static final String ENV_REDIS_PASSWORD = "REDIS_PASSWORD";

    public static final String BEAN_LIBRARY_SERVICE = "FETCH_BOOK_SERVICE";
    public static final String BEAN_BOOK_SERVICE = "BOOK_SERVICE";
    public static final String BEAN_BOOK_CACHE = "BOOK_CACHE";

    public static final String DEFAULT_PORT = "8080";

}