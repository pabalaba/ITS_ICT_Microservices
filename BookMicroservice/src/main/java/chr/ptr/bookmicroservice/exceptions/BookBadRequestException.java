package chr.ptr.bookmicroservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Bad Request", value = HttpStatus.BAD_REQUEST)
public class BookBadRequestException extends RuntimeException{

    public BookBadRequestException(){
        super("Bad Request");
    }
    public BookBadRequestException(String message){
        super(message);
    }
}
