package chr.ptr.notification.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues = "borrows")
@Slf4j
public class Consumer implements IConsumer{

    @RabbitHandler
    public void readMessage(String message) {

        log.info("From Queue : {}", message);
    }

}
