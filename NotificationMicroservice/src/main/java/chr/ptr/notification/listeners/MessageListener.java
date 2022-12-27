package chr.ptr.notification.listeners;

import chr.ptr.notification.configs.MQConfig;
import chr.ptr.notification.entities.CustomMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    @RabbitListener(queues = MQConfig.RESULT_RECEIVER)
    public void listener(CustomMessage customMessage){
        System.out.println(customMessage);
    }

}
