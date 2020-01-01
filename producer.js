const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'kafka-javascript',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

const produce = async () => {
  await producer.connect()
  let first = 0n;
  let second = 1n;
  let count = 0;
  let messages = [];

  while (count < 1000) {
    count++

    messages.push({
      key: 'id_' + first,
      value: first + ""
    });

    const sum = first + second
    first = second;
    second = sum
  }

  await producer.send({
    topic: 'fibonacci',
    messages: messages,
  });
  //.then(console.log)
  //.catch(e => console.error(`error producing message ${e.message}`, e));
};

produce();