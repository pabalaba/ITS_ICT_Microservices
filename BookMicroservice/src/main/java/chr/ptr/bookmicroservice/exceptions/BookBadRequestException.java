package chr.ptr.bookmicroservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Quantity can't be negative", value = HttpStatus.BAD_REQUEST)
public class BookBadRequestException extends RuntimeException{
}
