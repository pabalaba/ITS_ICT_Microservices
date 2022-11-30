package chr.ptr.bookmicroservice.entities;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;


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
    private Date publication_date;
    private int quantity;

    public Date getPublication_date() {
        return publication_date;
    }

    public void setPublication_date(String publication_date) {
        this.publication_date = Date.valueOf(publication_date);
    }

    public void setPublication_date(Date publication_date) {
        this.publication_date = publication_date;
    }
}
