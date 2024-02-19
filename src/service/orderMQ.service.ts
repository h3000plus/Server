import amqp, { Channel, Connection } from "amqplib"


let connection: Connection;

let marketplaceToKdsQueue = "marketplaceToKDS"
let marketplaceToInventoryQueue = "marketplaceToInventory";
let marketplaceToRiderQueue = "marketplaceToRider"

let channelForKDS: Channel;
let channelForInventory: Channel;
let channelForRider: Channel

// Connect and Create rabbit mq channel and connection
export async function connectToMQ() {
    try {
        const ampqServer = "amqps://ujuxbuct:HxHHm8XNtbtohKTPHi30fSdILcP9FhGQ@armadillo.rmq.cloudamqp.com/ujuxbuct"
        connection = await amqp.connect(ampqServer)
    } catch (err) {
        console.log(err);
    }
}

// Close rabbitmq connection and channel
export async function closeMQConnection() {
    try {
        if (connection) await connection.close()
    } catch (error) {
        console.log(error);
    }
}


// sending the order in MQ for KDS
export async function sendOrderToKDS(data: any) {
    try {
        // console.log('before sending to queue');
        channelForKDS = await connection.createChannel();
        await channelForKDS.assertQueue(marketplaceToKdsQueue, { durable: false })
        channelForKDS.sendToQueue(marketplaceToKdsQueue, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(error);
    } finally {
        if (channelForKDS) await channelForKDS.close()
    }

}


export async function sendToRider(data: any) {
    try {
        channelForRider = await connection.createChannel();
        await channelForRider.assertQueue(marketplaceToRiderQueue, { durable: false })
        channelForRider.sendToQueue(marketplaceToRiderQueue, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(error);
    } finally {
        if (channelForRider) await channelForKDS.close()
    }
}


