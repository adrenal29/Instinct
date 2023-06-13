const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let smartMeterIntervalId = null;
let smartMeterReadings = [];

// Helper function to start the simulated smart meter readings
let totalConsumed = 0; // Initialize the total consumed energy to 0

function startSmartMeterReadings() {
  smartMeterIntervalId = setInterval(() => {
    const now = new Date();
    const voltageValue = Math.floor(Math.random() * 220) + 180; // Generate a random voltage between 180V and 400V
    const currentValue = Math.floor(Math.random() * 10) + 1; // Generate a random current between 1A and 10A
    
    // Calculate unit consumption based on the voltage and current readings
    const power = voltageValue * currentValue;
    const timeInSeconds = 5; // The interval between readings is 5 seconds
    const energyInJoules = Math.max(power, 0) * timeInSeconds;
    const energyInKWh = energyInJoules / (1000 * 3600); // 1 kWh = 3.6e+6 J
    // const unitConsumption = Math.min(0.7, Math.max(0.4, energyInKWh)); // Limit the unit consumption to between 0.4 and 0.7 kWh
    // console.log(`Unit consumption: ${unitConsumption.toFixed(2)} kWh`);

    const unitConsumption=1;
    // Add the unit consumption to the total consumed energy
    totalConsumed += unitConsumption;
    console.log(`Total consumed: ${totalConsumed.toFixed(2)} kWh`);
    
    // Create a new reading object with the current readings and energy consumption data
    const reading = {
      meterId: "meter123",
      timestamp: now.toISOString(),
      voltage: voltageValue,
      current: currentValue,
      unitConsumption: unitConsumption.toFixed(2),
      consumed: totalConsumed.toFixed(2)
    };
    
    console.log(`Smart meter reading received: meterId=${reading.meterId}, timestamp=${reading.timestamp}, voltage=${reading.voltage}, current=${reading.current}, unitConsumption=${reading.unitConsumption}, totalConsumed=${reading.totalConsumed}`);
    
    // Broadcast the new reading to all connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(reading));
      }
    });
  }, 5000);
}
// Helper function to stop the simulated smart meter readings
function stopSmartMeterReadings() {
    clearInterval(smartMeterIntervalId);
    smartMeterIntervalId = null;
}

// Endpoint for starting the simulated smart meter readings
app.post("/smartmeter/start", function (req, res) {
    if (!smartMeterIntervalId) {
        startSmartMeterReadings();
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

// Endpoint for stopping the simulated smart meter readings
app.post("/smartmeter/stop", function (req, res) {
    if (smartMeterIntervalId) {
        stopSmartMeterReadings();
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

// Start the WebSocket server
wss.on("connection", function connection(ws) {
    console.log("WebSocket client connected");

    // Send the most recent smart meter reading to the WebSocket client
    const smartMeterReading = smartMeterReadings.slice(-1)[0];
    ws.send(JSON.stringify(smartMeterReading));

    // Send all previously received smart meter readings to the WebSocket client
    smartMeterReadings.forEach((reading) => {
        ws.send(JSON.stringify(reading));
    });

    // Handle WebSocket client disconnection
    ws.on("close", function () {
        console.log("WebSocket client disconnected");
    });
});

// Start the server
server.listen(3000, function () {
    console.log("Smart meter real-time simulation API listening on port 3000!");
});