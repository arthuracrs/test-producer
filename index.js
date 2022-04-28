const express = require('express')
const { Kafka } = require('kafkajs')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

app.post('/produce/:amount', async (req, res) => {
    const { amount } = req.params
    const { topic } = req.query
    
    await producer.connect()

    for (let i = 0; i < amount; i++) {
        await producer.send({
            topic,
            messages: [
                req.body,
            ],
        })

    }
    res.send()
})

const port = 3000
app.listen(port, () => {
    console.clear()
    console.log(`running on ${port}`)
})