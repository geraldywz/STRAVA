package tfip.strava.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import static tfip.strava.util.Constants.*;

@Service
public class GMapApiService {

    private final Logger logger = LoggerFactory.getLogger(GMapApiService.class);

    public String getDirections(String origin, String destination) {
        return getDirections(origin, destination, null);
    }

    public String getDirections(String origin, String destination, String[] waypoints) {
        final String url = generateURI(origin, destination, waypoints);
        logger.info("GMap API URL >>>>> " + url);

        return getResponse(url);
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

    private String generateURI(String origin, String destination, String[] waypoints) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
                .fromUriString(URL_GMAPS_DIRECTIONS_ENDPOINT)
                .queryParam("origin", origin)
                .queryParam("destination", destination);

        if (waypoints != null && waypoints.length > 0) {
            String pipe = "|";
            String wp = "";
            for (int i = 0; i < waypoints.length; i++) {
                wp = wp.concat(waypoints[i]);
                if (waypoints.length > 1 && i != waypoints.length - 1) {
                    wp = wp.concat(pipe);
                }
            }
            uriBuilder = uriBuilder.queryParam("waypoints", wp);
        }

        return uriBuilder
                .queryParam("avoid", PARAM_AVOID)
                .queryParam("mode", PARAM_MODE)
                .queryParam("key", KEY_GMAP_DIRECTIONS)
                .toUriString();
    }

    public String genLatLng(String lat, String lng) {
        return (lat + "," + lng).trim().replace(" ", "");
    }
}