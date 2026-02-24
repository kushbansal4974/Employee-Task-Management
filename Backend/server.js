import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";

dotenv.config({override: true});

const app = express();

app.get("/", (req, res)=>{
    res.send("Hello World!!!")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 5001

// apis
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server running at port ${PORT}`)
})