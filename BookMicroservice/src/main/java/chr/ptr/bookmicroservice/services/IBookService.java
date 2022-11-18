package chr.ptr.bookmicroservice.services;

import chr.ptr.bookmicroservice.entities.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IBookService {

    //CRUD
    //Create
    Book createBook(Book book);
    //Read
    List<Book> listBooks();
    Book indexBook(int id);
    //Update
    Book updateBook(int id,Book book);
    //Delete
    void deleteBook(int id);
}
