package chr.ptr.bookmicroservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Internal error", value = HttpStatus.BAD_REQUEST)
public class BookServerErrorException extends RuntimeException{
    public BookServerErrorException(){
        super("Internal Error");
    }
}
