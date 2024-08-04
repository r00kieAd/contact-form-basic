// app and dependecies initializations
import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import { promises as fs } from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
// setting up middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// a custom middleware to log request and responses
app.use(customLogger);

app.get('/index.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/success.html', async (req, res) => {
    const obj = req.body;
    const state = await updateJson(obj);
    try {
        if (state.code != 200) {
            res.status(state.code).json({ error: state.msg });
            return;
        }
        res.status(200);
        res.json({ redirectUrl: '/success.html' });
    } catch (err) {
        console.log(state);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

async function updateJson(obj) {
    try {
      const data = await fs.readFile("data/data.json", "utf8");
  
      let jsonArray = [];
  
      if (data) {
        try {
          jsonArray = JSON.parse(data);
          if (!Array.isArray(jsonArray)) {
            jsonArray = [];
          }
        } catch (parseErr) {
          console.log("Error parsing JSON:", parseErr);
          return { code: 500, msg: "Internal Server Error" };
        }
      }
  
      jsonArray.push(obj);
  
      // formatting with 2 spaces at the time of stringifying
      const updateData = JSON.stringify(jsonArray, null, 2);
  
      await fs.writeFile("data/data.json", updateData);
      console.log("File updated");
  
      return { code: 200, msg: "success" };
    } catch (err) {
      console.log(err);
      return { code: 500, msg: "Internal Server Error" };
    }
  }

function customLogger(req, res, next) {
    console.log(`Request Method: ${req.method}, requested url: ${req.url}, request status: ${res.status}`);
    next();
}

app.listen(port, () => {
    console.log(`This server is running on port ${port}. Link: 'http://localhost:${port}/index.html'`);
});