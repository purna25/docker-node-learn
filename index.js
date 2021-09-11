const express = require("express");
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
})
.then(() => console.log("Connected to DB"))
.catch((e)=>console.log(e))


const app = express();

app.get("/", (req, res) => {
    res.send("<h2> Hi There!!!</h2>");
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})