package tfip.strava.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ListToStringConverter {

    public String convertToDatabaseColumn(List<String> attribute) {
        return attribute == null ? null : String.join(",", attribute);
    }

    public List<String> convertToEntityAttribute(String dbData) {
        return dbData == null ? Collections.emptyList() : Arrays.asList(dbData.split(","));
    }
}
