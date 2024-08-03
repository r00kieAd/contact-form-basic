// app and dependecies initializations
import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;
// setting up middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// a custom middleware to log request and responses
function customLogger(req, res, next) {
    console.log(`Request Method: ${req.method}, requested url: ${req.url}, request status: ${req.status}`);
    next();
}
app.use(customLogger);

app.get('/index.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`This server is running on port ${port}. Link: 'http://localhost:${port}/index.html'`);
});