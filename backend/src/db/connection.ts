import { connect, disconnect } from 'mongoose'

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
        .then(() => { console.log("MongoDB connected successfully!") })
    } catch (error) {
        console.log(error)
        throw new Error("Cannot connect to MongoDB")
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect()
    } catch (error) {
        console.log(error)
        throw new Error("Could not disconnect from MongoDB")
    }
}

export { connectToDatabase, disconnectFromDatabase }
