const express = require("express");
const mongoose = require('mongoose');
const session = require("express-session");
const redis = require("redis");


const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});


const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })
    .then(() => console.log("Connected to DB"))
    .catch((e)=>{
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })
    
}

connectWithRetry();

const app = express();


app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000 * 60,
    }
}));


app.use(express.json())
app.get("/", (req, res) => {
    res.send("<h2> Hi There!!!</h2>");
});


// localhost:3000/posts
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})