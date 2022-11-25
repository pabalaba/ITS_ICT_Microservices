package chr.ptr.bookmicroservice.entities;

import lombok.Data;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;


@Entity
@Table(name = "books")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String author;
    private int pages;
    private Timestamp publication_date;

    public Timestamp getPublication_date() {
        return publication_date;
    }

    public void setPublication_date(String publication_date) {
        this.publication_date = Timestamp.valueOf(publication_date);
    }

    public void setPublication_date(Timestamp publication_date) {
        this.publication_date = publication_date;
    }
}
