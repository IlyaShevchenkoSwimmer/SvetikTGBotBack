import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

const jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/dist/index.html");
  } catch (error) {
    console.log(error);
  }
});

app.get("/checkresults", (req, res) => {
  try {
    const data = fs.readFileSync("./results.json", {
      encoding: "utf-8",
      flag: "r",
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addresult", jsonParser, (req, res) => {
  try {
    const newData = JSON.stringify(req.body);
    fs.writeFileSync("./results.json", newData, {
      encoding: "utf8",
      flag: "a+",
      mode: 0o666,
    });
    res.send(JSON.stringify({ result: "success" }));
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
