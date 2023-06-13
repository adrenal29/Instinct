import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import firebase from 'firebase/compat/app';
import web3 from 'web3';
import EnergyTradingContract from '../EnergyTrading.json';
import { contractAdd } from './config.js';
import Web3 from 'web3';
const Solar = (props) => {
  const [web3, setWeb3] = useState('')
  const contractAddress = contractAdd;

  const [totalGenerated, setTotalGenerated] = useState(0);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Generated Energy (kWh)',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2
      }
    ]
  });
  
  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's accounts in Metamask
        await window.ethereum.enable();

        // Connect to the network using Web3
        const provider = new Web3.providers.HttpProvider("http://localhost:8545");
        const newWeb3 = new Web3(provider);
        setWeb3(newWeb3);
      } catch (error) {
        console.error("Error connecting to network:", error);
      }
    } else {
      console.error("Metamask not detected.");
    }
  };
  const uuid = localStorage.getItem('user1')
  useEffect(() => {
    handleConnect();
    let webSocket;

    if (isWebSocketOpen) {
      webSocket = new WebSocket('ws://localhost:4000/start');
      webSocket.addEventListener('open', () => {
        console.log('WebSocket connection opened');
      });

      webSocket.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        console.log("Received data:", data);

        setTotalGenerated(data.totalGenerated);

        setChartData(chartData => {
          const newChartData = {
            labels: [...chartData.labels, new Date().toLocaleTimeString()],
            datasets: [
              {
                ...chartData.datasets[0],
                data: [...chartData.datasets[0].data, data.totalGenerated]
              }
            ]
          };
          return newChartData;
        });
      });


    }

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [isWebSocketOpen]);

  const start = () => {
    setIsWebSocketOpen(true);

    // Send a POST request to start the simulated smart meter readings
    fetch('http://localhost:4000/start', {
      method: 'POST'
    })
      .then(response => {
        if (response.ok) {
          console.log('Simulated smart meter readings started');
        } else {
          console.error('Failed to start simulated smart meter readings');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const stop = async () => {
    setIsWebSocketOpen(false);

    // Send a POST request to stop the simulated smart meter readings
    fetch('http://localhost:4000/stop', {
      method: 'POST'
    })
      .then(response => {
        if (response.ok) {
          console.log('Simulated smart meter readings stopped');
        } else {
          console.error('Failed to stop simulated smart meter readings');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });



    // Get a reference to the meter object in the Firebase Realtime Database
    const databaseRef = firebase.database().ref(`users/${uuid}/meter`);
    let updatedEnergyValue = 0;
    // Fetch the current energy value from the database and update it
    await databaseRef.once('value')
      .then(snapshot => {
        const currentEnergyValue = snapshot.val().energy;
        updatedEnergyValue = parseInt(currentEnergyValue) + parseInt(totalGenerated); // Replace with the updated energy value
        databaseRef.update({ energy: updatedEnergyValue });
      })
      .catch(error => {
        console.error('Error fetching energy value:', error);
      });

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const energyTradingContract = new web3.eth.Contract(EnergyTradingContract.abi, contractAddress);
    // Call the updateMeterEnergy function in the smart contract
    const result = await energyTradingContract.methods.updateMeterEnergyAndCarbonCredits(sender, updatedEnergyValue,0).send({ from: sender });
    console.log(result);

  };

  return (
    <>
      <div>Solar</div>
      <button disabled={isWebSocketOpen} onClick={start} className='startBtn'>
        Start Generating
      </button>
      <button onClick={stop}>Stop Connection</button>
      <p>Total Generated Energy: {totalGenerated} kWh</p>
      <div style={{ height: '300px' }}>
        <Line data={chartData} />
      </div>
    </>
  );
};

export default Solar;