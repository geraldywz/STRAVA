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

    public String getDirections() {

        final String url = generateURI("Hougang Mall", "25 Heng Mui Keng Terrace");
        logger.info("GMap API URL >>>>> " + url);

        String directions = null;
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Request request = new Request.Builder()
                .url(url)
                .method("GET", null)
                .build();

        try (Response response = client.newCall(request).execute()) {
            directions = response.body().string();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return directions;
    }

    private String generateURI(String origin, String destination) {
        return UriComponentsBuilder
                .fromUriString(URL_GMAPS_DIRECTIONS_ENDPOINT)
                .queryParam("origin", origin)
                .queryParam("destination", destination)
                .queryParam("avoid", PARAM_AVOID)
                .queryParam("mode", PARAM_MODE)
                .queryParam("key", KEY_GMAP_DIRECTIONS)
                .toUriString();
    }

    private String genLatLng(String lat, String lng) {
        return lat + "," + lng;
    }
}