"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
const jsonParser = body_parser_1.default.json();
app.use(express_1.default.static(__dirname + "/dist"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});
app.post("/addresult", jsonParser, (req, res) => {
    const newData = JSON.stringify(req.body);
    fs_1.default.writeFileSync("./results.json", newData, {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666,
    });
    res.send(JSON.stringify({ result: "success" }));
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
