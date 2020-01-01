const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'kafka-javascript-default-group' })

const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'fibonacci', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        key: message.value.toString(),
        value: message.value.toString(),
      });
      console.log()
    },
  })
}

consume()