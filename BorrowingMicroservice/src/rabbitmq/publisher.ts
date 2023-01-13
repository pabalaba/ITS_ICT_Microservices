import client, {Connection, Channel} from 'amqplib';

const sendMessage = (channel : Channel, queue : string , message : string) => {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message),'utf8'), {contentType:'text/plain', contentEncoding: 'UTF-8'});
}

const go = async (queue : string, message : string) => {

  const server : String = process.env.AMQP_SERVER || "localhost";
  const user : String = process.env.AMQP_USER || "admin";
  const password : String = process.env.AMQP_PASSWORD || "password";

  const connection : Connection = await client.connect(`amqp://${user}:${password}@${server}`);
  const channel : Channel = await connection.createChannel();
  await channel.assertQueue("borrows");
  sendMessage(channel, queue, message);
}

export default go;