const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let intervalId = null;
let totalGenerated = 0;

function startGeneration() {
  intervalId = setInterval(() => {
    const now = new Date();
    const energyValue = Math.floor(Math.random() * 1000) + 500; // Generate a random energy value between 500W and 1500W

    totalGenerated += energyValue;

    const generatedInKWh = totalGenerated / 1000;

    console.log(`Total generated: ${generatedInKWh.toFixed(2)} kWh`);

    const response = {
        totalGenerated: generatedInKWh.toFixed(2)
    };

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(response));
      }
    });
  }, 5000);
}

app.get("/", function (req, res) {
  res.send("Welcome to the energy generation simulation API");
});

app.post("/start", function (req, res) {
  if (!intervalId) {
    startGeneration();
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.post("/stop", function (req, res) {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    totalGenerated = 0;
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

wss.on("connection", function connection(ws) {
    console.log("WebSocket client connected");

    const response = {
        totalGenerated: (totalGenerated / 1000).toFixed(2)
    };
    
    ws.send(JSON.stringify(response));

    ws.on("close", function () {
        console.log("WebSocket client disconnected");
    });
});

server.listen(4000, function () {
  console.log("Energy generation simulation API listening on port 4000!");
});