const mongoose = require("mongoose")

require("dotenv").config()

const initDatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("db connection error", error)
        process.exit(1)
    }
}

const startServer = async (port, app) => {
    await initDatabaseConnection()
    app.listen(port, () => {
        console.log(`server listening on port ${port}`)
    })
}

module.exports = startServer