// import {urlshortner} from "../models/datamodel";
import express from "express";
import { client } from "../index.js";
import shortener from "node-url-shortener";

const router = express.Router();

// url shorting using node-rul-shortner :
router.post("/longurl", async (req, res) => {
  try {
    const { longUrl} = req.body;

    shortener.short(`${longUrl}`, function (err, url) {
      if (err) {
        return err;
      }
      // Print the shortened URL
      // console.log("short url :", url);

      let data = {
        longUrl: longUrl,
        shortUrl: url,
      };
      const result = client
      .db("urlshortner")
      .collection("url-list")
      .insertOne(data);
    res.send({ data: data, result: result });
    });
    
  } catch (error) {
    res.status(500).send({ Message: "Internal server error", Error: error });
  }
});

router.get("/shorturl", async (req, res) => {
  try {
    const { longUrl } = req.body;

    const result = await client
      .db("urlshortner")
      .collection("url-list")
      .findOne({ longUrl: longUrl });

    if(!result){
      return res.status(401).send({message: "Url not matching..."})
    }
      res.status(200).send(result);
    
  } catch (error) {
    res.status(500).send({ message: "Internal server error", Error : error });
  }
});

export default router;
