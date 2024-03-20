const express = require("express")
const {connection}  = require("./config/db")
const {userRouter} = require("./routes/userRouter");
const { bookRouter } = require("./routes/bookRouter");
const { orderRouter } = require("./routes/orderRouter");




const app = express()

app.use(express.json());

app.use("/users",userRouter)
app.use("/books",bookRouter)
app.use("/orders",orderRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})

