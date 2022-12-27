package chr.ptr.notification.configs;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MQConfig {

    public static final String RESULT_RECEIVER = "result_receiver";
    public static final String RESULT_EXCHANGE = "result_exchange";
    public static final String RESULT_ROUTING_KEY = "result_routingkey";

    @Bean
    public Queue queue(){
        return new Queue(RESULT_RECEIVER);
    }

    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(RESULT_EXCHANGE);
    }

    @Bean
    public Binding binding(Queue queue,TopicExchange exchange){
        return BindingBuilder
                .bind(queue)
                .to(exchange)
                .with(RESULT_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    public AmqpTemplate template(ConnectionFactory connectionFactory){
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }

}
