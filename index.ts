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
  res.sendFile(__dirname + "/dist/index.html");
});

app.post("/addresult", jsonParser, (req, res) => {
  const newData = JSON.stringify(req.body);
  fs.writeFileSync("./results.json", newData, {
    encoding: "utf8",
    flag: "a+",
    mode: 0o666,
  });
  res.send(JSON.stringify({ result: "success" }));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
