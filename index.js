import express from"express";
import * as dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import registerurl from "./route/urlShort.js";
import authRouter from "./authentication/authentication.js";
// const db = require("./db/connect");
// const registerurl = require("./route/printurl");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://url-shortner-reactt.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

const client = new MongoClient(
  "mongodb+srv://kalaiselvan:kalai1@cluster0.oiqqgzq.mongodb.net"
);


await client.connect();
console.log("Mongodb connected...");

const PORT =process.env.PORT ;
app.get("/", function(req, res) {
  res.send("hai");
});
app.use("/api", registerurl);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
