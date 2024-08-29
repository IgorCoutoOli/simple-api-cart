import express from "express";
import router from "./route.js";

const app = express()

app.use(router)

app.listen(4001, () => { console.log('Started!') });