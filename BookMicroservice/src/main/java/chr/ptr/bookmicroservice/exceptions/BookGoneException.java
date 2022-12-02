package chr.ptr.bookmicroservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.GONE, value = HttpStatus.GONE,reason = "Book was already gone")
public class BookGoneException extends RuntimeException{
    public BookGoneException(){
        super("Book was already gone");
    }
}
