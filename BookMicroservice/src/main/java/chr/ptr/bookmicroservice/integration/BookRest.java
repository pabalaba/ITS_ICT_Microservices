package chr.ptr.bookmicroservice.integration;

import chr.ptr.bookmicroservice.entities.Book;
import chr.ptr.bookmicroservice.services.BookService;
import chr.ptr.bookmicroservice.services.ITraceService;
import chr.ptr.bookmicroservice.services.TraceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api")
public class BookRest {

    @Autowired
    private TraceService traceService;

    @Autowired
    private BookService service;

    @GetMapping("books")
    public List<Book> list(){
        log.info("[BookRest]:[list] Operation read all");
        return service.listBooks();
    }

    @GetMapping("books/{id}")
    public Book index(@PathVariable int id){
        log.info("[BookRest]:[index] Operation read one. ID: "+id);
        return service.indexBook(id);
    }

    @PostMapping("books")
    public Book create(@RequestBody Book book){
        log.info("[BookRest]:[create] Operation create");
        return service.createBook(book);
    }

    @PutMapping("books/{id}")
    public Book update(@PathVariable int id, @RequestBody Book book){
        log.info("[BookRest]:[update] Operation update one. ID: "+id);
        return service.updateBook(id,book);
    }

    @PutMapping("books/quantity/add/{id}")
    public Book updateAdd(@PathVariable int id){
        log.info("[BookRest]:[updateAdd] Operation update add quantity. ID: "+id);
        return service.updateAddQuantity(id);
    }

    @PutMapping("books/quantity/sub/{id}")
    public Book updateSub(@PathVariable int id){
        log.info("[BookRest]:[updateSub] Operation update subtract quantity. ID: "+id);
        return service.updateSubQuantity(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("books/{id}")
    public void delete(@PathVariable int id){
        log.info("[BookRest]:[delete] Operation delete. ID: "+id);
        service.deleteBook(id);
    }



}
