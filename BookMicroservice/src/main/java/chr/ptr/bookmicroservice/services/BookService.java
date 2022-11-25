package chr.ptr.bookmicroservice.services;

import chr.ptr.bookmicroservice.dao.BookDao;
import chr.ptr.bookmicroservice.entities.Book;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BookService implements IBookService{

    @Autowired
    private BookDao repo;


    @Override
    public Book createBook(Book book) {
        return repo.save(book);
    }

    @Override
    public List<Book> listBooks() {
        return repo.findAll();
    }

    @Override
    public Book indexBook(int id) {
        try{
            return repo.findById(id).get();
        }catch (Exception ignored){};
        return null;
    }

    @Override
    public Book updateBook(int id, Book book) {
        Book bookFromDB = indexBook(id);
        if(bookFromDB == null)
            return null;
        bookFromDB.setAuthor(book.getAuthor());
        bookFromDB.setPages(book.getPages());
        bookFromDB.setTitle(book.getTitle());
        bookFromDB.setPublication_date(book.getPublication_date().toString());
        return repo.save(bookFromDB);
    }

    @Override
    public void deleteBook(int id) {
        repo.deleteById(id);
    }
}
