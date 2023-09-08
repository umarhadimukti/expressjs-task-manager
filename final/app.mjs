import connectDB from "./db/connect.mjs"
import { errNotFound } from "./middleware/error404.js"
import { errHandlerMiddleware } from "./middleware/errorHandler.mjs"
import tasks from "./routes/tasks.mjs"
import express from "express"
import {} from "dotenv/config"

const app = express()

//middleware
app.use(express.static("./public"))
app.use(express.json())

//routes
app.use("/api/v1/tasks", tasks)

//page not found
app.use(errNotFound)
app.use(errHandlerMiddleware)

//listening port & connect DB
const port = process.env.PORT || 5000
const start = async () => {
    try {
        console.log("CONNECTED TO DB!")
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is up and running at port ${port}`))
    } catch(err) {
        console.log(err)
    }
}
    
start()