package tfip.strava.repo;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import tfip.strava.model.Book;

import static tfip.strava.repo.SQL.*;

@Repository
public class BookRepo {

    @Autowired
    private JdbcTemplate template;

    private static final Logger logger = LoggerFactory.getLogger(BookRepo.class);

    public List<Book> getBooks(final int limit) {
        return this.getBooks(limit, 0);
    }

    public List<Book> getBooks(final int limit, final int offset) {
        final List<Book> books = new LinkedList<>();
        final SqlRowSet rs = template.queryForRowSet(
                SQL_GET_ALL_BOOKS_BY_LIMIT_OFFSET,
                limit,
                offset);

        while (rs.next()) {
            books.add(Book.populate(rs));
        }
        return (Collections.unmodifiableList(books));
    }

    public List<Book> getBooksByTitle(final String title) {
        final List<Book> books = new LinkedList<>();
        final String search = "%" + title + "%";
        final SqlRowSet rs = template.queryForRowSet(
                SQL_GET_BOOKS_BY_TITLE,
                search);

        while (rs.next()) {
            books.add(Book.populate(rs));
        }
        return (Collections.unmodifiableList(books));
    }

    public int getBookFormatCount(String format) {
        logger.info("Counting Books with format >>>>> " + format);
        final SqlRowSet rs = template.queryForRowSet(
                SQL_GET_BOOKS_FORMAT_COUNT,
                format);
        int result = 0;
        if (rs.next()) {
            result = rs.getInt("formats");
        }
        logger.info("Number of " + format + " books exist >>>>> " + result);
        return result;
    }

    public List<String> getFormats() {
        final List<String> result = new LinkedList<>();
        final SqlRowSet rs = template.queryForRowSet(SQL_GET_BOOKS_FORMAT);

        while (rs.next()) {
            result.add(rs.getString("format").toLowerCase());
        }
        return (Collections.unmodifiableList(result));
    }

}
