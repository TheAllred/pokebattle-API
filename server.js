import express from "express"
import {connectToDatabase} from "./database/connection";

const app = express()
const port = 8080
connectToDatabase()
    .then(() => {
        app.get("/", () => {
            console.log("Server Running")
        });

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed", error);
        process.exit();
    });