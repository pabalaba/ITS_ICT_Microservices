package chr.ptr.bookmicroservice.integration;

import chr.ptr.bookmicroservice.entities.Book;
import chr.ptr.bookmicroservice.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class BookRest {

    @Autowired
    private BookService service;

    @GetMapping("books")
    public List<Book> list(){
        return service.listBooks();
    }

    @GetMapping("books/{id}")
    public Book index(@PathVariable int id){
        return service.indexBook(id);
    }

    @PostMapping("books")
    public Book create(@RequestBody Book book){
        return service.createBook(book);
    }

    @PutMapping("books/{id}")
    public Book update(@PathVariable int id, @RequestBody Book book){
        return service.updateBook(id,book);
    }

    @PutMapping("books/quantity/add/{id}")
    public Book updateAdd(@PathVariable int id){
        return service.updateAddQuantity(id);
    }

    @PutMapping("books/quantity/sub/{id}")
    public Book updateSub(@PathVariable int id){
        return service.updateSubQuantity(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("books/{id}")
    public void delete(@PathVariable int id){
        service.deleteBook(id);
    }



}
