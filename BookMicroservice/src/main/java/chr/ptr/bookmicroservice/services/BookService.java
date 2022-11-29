package chr.ptr.bookmicroservice.services;

import chr.ptr.bookmicroservice.dao.BookDao;
import chr.ptr.bookmicroservice.entities.Book;
import chr.ptr.bookmicroservice.exceptions.BookBadRequestException;
import chr.ptr.bookmicroservice.exceptions.BookGoneException;
import chr.ptr.bookmicroservice.exceptions.BookNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Book indexBook(int id) throws BookNotFoundException {
        Optional<Book> bookOpt = repo.findById(id);
        if(bookOpt.isPresent()){
            return bookOpt.get();
        }else{
            throw new BookNotFoundException();
        }
    }

    @Override
    public Book updateBook(int id, Book book) throws BookNotFoundException{
        Book bookFromDB = indexBook(id);
        if(bookFromDB == null)
            return null;
        bookFromDB.setAuthor(book.getAuthor());
        bookFromDB.setPages(book.getPages());
        bookFromDB.setTitle(book.getTitle());
        bookFromDB.setPublication_date(book.getPublication_date().toString());
        bookFromDB.setQuantity(book.getQuantity());
        return repo.save(bookFromDB);
    }

    @Override
    public Book updateAddQuantity(int id) throws BookNotFoundException{
        Book bookFromDB = indexBook(id);
        if(bookFromDB == null)
            return null;
        bookFromDB.setQuantity(bookFromDB.getQuantity() + 1);
        return repo.save(bookFromDB);
    }

    @Override
    public Book updateSubQuantity(int id) throws BookBadRequestException,BookNotFoundException {
        Book bookFromDB = indexBook(id);
        if(bookFromDB == null)
            return null;
        if(bookFromDB.getQuantity()>0) {
            bookFromDB.setQuantity(bookFromDB.getQuantity() - 1);
            return repo.save(bookFromDB);
        }else
            throw new BookBadRequestException();
    }

    @Override
    public void deleteBook(int id) throws BookGoneException{
        try {
            repo.deleteById(id);
        }catch (Exception e){
            throw new BookGoneException();
        }
    }
}
