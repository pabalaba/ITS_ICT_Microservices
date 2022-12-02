package chr.ptr.bookmicroservice.services;

import chr.ptr.bookmicroservice.dao.BookDao;
import chr.ptr.bookmicroservice.entities.Book;
import chr.ptr.bookmicroservice.exceptions.BookBadRequestException;
import chr.ptr.bookmicroservice.exceptions.BookGoneException;
import chr.ptr.bookmicroservice.exceptions.BookNotFoundException;
import chr.ptr.bookmicroservice.exceptions.BookServerErrorException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
        try {
            long systime = System.currentTimeMillis();
            Book b = repo.save(book);
            systime = System.currentTimeMillis() - systime;
            log.info("[BookService]:[createBook] Time required to create a record: "+systime+"ms");
            return b;
        }catch (Exception e){
            BookServerErrorException exception = new BookServerErrorException();
            log.error("[BookService]:[createBook] Exception: "+exception.getMessage());
            throw exception;
        }
    }

    @Override
    public List<Book> listBooks() {
        try {
            long systime = System.currentTimeMillis();
            List<Book> books = repo.findAll();
            systime = System.currentTimeMillis() - systime;
            log.info("[BookService]:[listBooks] Time required to find records: " + systime + "ms");
            return books;
        }catch (Exception e){
            BookServerErrorException exception = new BookServerErrorException();
            log.error("[BookService]:[listBooks] Exception: "+exception.getMessage());
            throw exception;
        }
    }

    @Override
    public Book indexBook(int id) throws BookNotFoundException {
        try {
            long systime = System.currentTimeMillis();
            Optional<Book> bookOpt = repo.findById(id);
            systime = System.currentTimeMillis() - systime;
            log.info("[BookService]:[indexBook] Time required to find record: " + systime + "ms");
            if (bookOpt.isPresent()) {
                return bookOpt.get();
            } else {
                BookNotFoundException exception = new BookNotFoundException();
                log.error("[BookService]:[indexBook] Exception: " + exception.getMessage());
                throw exception;
            }
        }catch (Exception e){
        BookServerErrorException exception = new BookServerErrorException();
        log.error("[BookService]:[indexBook] Exception: "+exception.getMessage());
        throw exception;
    }
    }

    @Override
    public Book updateBook(int id, Book book) throws BookNotFoundException{
        try{
            Book bookFromDB = indexBook(id);
            if(bookFromDB == null)
                return null;
            bookFromDB.setAuthor(book.getAuthor());
            bookFromDB.setPages(book.getPages());
            bookFromDB.setTitle(book.getTitle());
            bookFromDB.setPublication_date(book.getPublication_date().toString());
            bookFromDB.setQuantity(book.getQuantity());
            long systime = System.currentTimeMillis();
            Book b = repo.save(bookFromDB);
            systime = System.currentTimeMillis() - systime;
            log.info("[BookService]:[updateBook] Time required to update a record: "+systime+"ms");
            return b;
        }catch (Exception e){
            BookServerErrorException exception = new BookServerErrorException();
            log.error("[BookService]:[updateBook] Exception: "+exception.getMessage());
            throw exception;
        }
    }

    @Override
    public Book updateAddQuantity(int id) throws BookNotFoundException{
        try {
            Book bookFromDB = indexBook(id);
            if (bookFromDB == null)
                return null;
            bookFromDB.setQuantity(bookFromDB.getQuantity() + 1);
            long systime = System.currentTimeMillis();
            Book b = repo.save(bookFromDB);
            systime = System.currentTimeMillis() - systime;
            log.info("[BookService]:[updateAddQuantity] Time required to update a record: " + systime + "ms");
            return b;
        }catch (Exception e){
        BookServerErrorException exception = new BookServerErrorException();
        log.error("[BookService]:[updateAddQuantity] Exception: "+exception.getMessage());
        throw exception;
    }
    }

    @Override
    public Book updateSubQuantity(int id) throws BookBadRequestException,BookNotFoundException {
        Book bookFromDB = indexBook(id);
        try {
            if (bookFromDB == null)
                return null;
            if (bookFromDB.getQuantity() > 0) {
                bookFromDB.setQuantity(bookFromDB.getQuantity() - 1);
                long systime = System.currentTimeMillis();
                Book b = repo.save(bookFromDB);
                systime = System.currentTimeMillis() - systime;
                log.info("[BookService]:[updateSubQuantity] Time required to update a record: " + systime + "ms");
                return b;
            } else {
                throw new BookBadRequestException();
            }
        }catch (BookBadRequestException e) {
            log.error("[BookService]:[updateSubQuantity] Exception: " + e.getMessage());
            throw e;
        }catch (BookServerErrorException e) {
            BookServerErrorException exception = new BookServerErrorException();
            log.error("[BookService]:[updateSubQuantity] Exception: " + exception.getMessage());
            throw exception;
        }
    }

    @Override
    public void deleteBook(int id) throws BookGoneException{
        try {
            long systime = System.currentTimeMillis();
            repo.deleteById(id);
            systime = System.currentTimeMillis() - systime;
            log.info("[BookService]:[deleteBook] Time required to delete record: "+systime+"ms");
        }catch (EmptyResultDataAccessException e){
            BookGoneException exception = new BookGoneException();
            log.error("[BookService]:[deleteBook] Exception: "+exception.getMessage());
            throw exception;
        }catch (BookServerErrorException e) {
            BookServerErrorException exception = new BookServerErrorException();
            log.error("[BookService]:[deleteBook] Exception: " + exception.getMessage());
            throw exception;
        }
    }
}
