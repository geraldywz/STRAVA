package tfip.strava.model;

import java.util.Objects;

import org.springframework.jdbc.support.rowset.SqlRowSet;

public class Book {

    private String bookid;
    private String title;
    private String authors;
    private String description;
    private String edition;
    private String format;
    private int pages;
    private float rating;
    private int ratingCount;
    private int reviewCount;
    private String genres;
    private String imageUrl;

    public Book() {
    }

    public Book(String bookid, String title, String authors, String description, String edition, String format,
            int pages, float rating, int ratingCount, int reviewCount, String genres, String imageUrl) {
        this.bookid = bookid;
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.edition = edition;
        this.format = format;
        this.pages = pages;
        this.rating = rating;
        this.ratingCount = ratingCount;
        this.reviewCount = reviewCount;
        this.genres = genres;
        this.imageUrl = imageUrl;
    }

    public String getBookid() {
        return this.bookid;
    }

    public void setBookid(String bookid) {
        this.bookid = bookid;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthors() {
        return this.authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEdition() {
        return this.edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getFormat() {
        return this.format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public int getPages() {
        return this.pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public float getRating() {
        return this.rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getRatingCount() {
        return this.ratingCount;
    }

    public void setRatingCount(int ratingCount) {
        this.ratingCount = ratingCount;
    }

    public int getReviewCount() {
        return this.reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getGenres() {
        return this.genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Book bookid(String bookid) {
        setBookid(bookid);
        return this;
    }

    public Book title(String title) {
        setTitle(title);
        return this;
    }

    public Book authors(String authors) {
        setAuthors(authors);
        return this;
    }

    public Book description(String description) {
        setDescription(description);
        return this;
    }

    public Book edition(String edition) {
        setEdition(edition);
        return this;
    }

    public Book format(String format) {
        setFormat(format);
        return this;
    }

    public Book pages(int pages) {
        setPages(pages);
        return this;
    }

    public Book rating(float rating) {
        setRating(rating);
        return this;
    }

    public Book ratingCount(int ratingCount) {
        setRatingCount(ratingCount);
        return this;
    }

    public Book reviewCount(int reviewCount) {
        setReviewCount(reviewCount);
        return this;
    }

    public Book genres(String genres) {
        setGenres(genres);
        return this;
    }

    public Book imageUrl(String imageUrl) {
        setImageUrl(imageUrl);
        return this;
    }



    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Book)) {
            return false;
        }
        Book book = (Book) o;
        return Objects.equals(bookid, book.bookid) && Objects.equals(title, book.title)
                && Objects.equals(authors, book.authors) && Objects.equals(description, book.description)
                && Objects.equals(edition, book.edition) && Objects.equals(format, book.format) && pages == book.pages
                && rating == book.rating && ratingCount == book.ratingCount && reviewCount == book.reviewCount
                && Objects.equals(genres, book.genres) && Objects.equals(imageUrl, book.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookid, title, authors, description, edition, format, pages, rating, ratingCount,
                reviewCount, genres, imageUrl);
    }

    @Override
    public String toString() {
        return "{" +
                " bookid='" + getBookid() + "'" +
                ", title='" + getTitle() + "'" +
                ", authors='" + getAuthors() + "'" +
                ", description='" + getDescription() + "'" +
                ", edition='" + getEdition() + "'" +
                ", format='" + getFormat() + "'" +
                ", pages='" + getPages() + "'" +
                ", rating='" + getRating() + "'" +
                ", ratingCount='" + getRatingCount() + "'" +
                ", reviewCount='" + getReviewCount() + "'" +
                ", genres='" + getGenres() + "'" +
                ", imageUrl='" + getImageUrl() + "'" +
                "}";
    }

    public static Book populate(SqlRowSet rs) {
        return new Book(
                rs.getString("book_id"),
                rs.getString("title"),
                rs.getString("authors"),
                rs.getString("description"),
                rs.getString("edition"),
                rs.getString("format"),
                rs.getInt("pages"),
                rs.getFloat("rating"),
                rs.getInt("rating_count"),
                rs.getInt("review_count"),
                rs.getString("genres"),
                rs.getString("image_url"));
    }
}
