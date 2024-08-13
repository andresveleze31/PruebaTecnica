import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"


dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


server.listen(PORT, () => {
    connectToMongoDB();
    console.log("Server from" + PORT)
})