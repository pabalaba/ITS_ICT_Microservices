package chr.ptr.notification.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomMessage {

    private String messageID;
    private String message;
    private Date data;

}
