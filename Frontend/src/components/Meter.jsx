import { Chart } from 'chart.js';
import React, { useState, useEffect } from 'react';
import Blink from './Blink';
import Graph from './Graph';
import firebase from 'firebase/compat/app';
import EnergyTradingContract from '../EnergyTrading.json';
import { contractAdd } from './config.js';
import Web3 from 'web3';
const Meter = () => {
  const [meterData, setMeterData] = useState(null);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [web3, setWeb3] = useState('')
  const contractAddress = contractAdd;
  const[blink,setBlink]=useState(null)
  const startMeter =async () => {

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

    setBlink(true);
    setIsWebSocketOpen(true);

    

    // Send a POST request to start the simulated smart meter readings
    fetch('http://localhost:3000/smartmeter/start', {
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
  const uuid=localStorage.getItem('user1');
  const stopMeter = async() => {
    setIsWebSocketOpen(false);
    console.log('WebSocket connection closed');
    setBlink(null)
    fetch('http://localhost:3000/smartmeter/stop', {
      method: 'POST'
    })
    // Get a reference to the meter object in the Firebase Realtime Database
    const databaseRef = firebase.database().ref(`users/${uuid}/meter`);

    // Fetch the current energy value from the database and update it
    let updatedEnergyValue;
    databaseRef.once('value')
      .then(snapshot => {
        const currentEnergyValue = snapshot.val().energy;
         updatedEnergyValue = currentEnergyValue -meterData.consumed; // Replace with the updated energy value
        if(updatedEnergyValue<0)
        updatedEnergyValue=0;
        databaseRef.set({ energy: updatedEnergyValue });
      })
      .catch(error => {
        console.error('Error fetching energy value:', error);
      });
      try{
        
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];
      const energyTradingContract = new web3.eth.Contract(EnergyTradingContract.abi, contractAddress);
      // Call the updateMeterEnergy function in the smart contract
      const result = await energyTradingContract.methods.updateMeterEnergyAndCarbonCredits(sender, updatedEnergyValue,0).send({ from: sender });
      console.log(result);
      }catch(err){
        console.log(err)
      }
  };

  useEffect(() => {
    if (isWebSocketOpen) {
      const webSocket = new WebSocket('ws://localhost:3000');

      webSocket.addEventListener('open', () => {
        console.log('WebSocket connection opened');
      });

      webSocket.addEventListener('message', event => {
        const message = JSON.parse(event.data);
        setMeterData(message);
        
      });

      return () => {
        webSocket.close();
      };
    }
  }, [isWebSocketOpen]);

  return (
    <div>
      <button disabled={isWebSocketOpen} onClick={startMeter} className='startBtn'>
        Start Meter
      </button>
      <button disabled={!isWebSocketOpen} onClick={stopMeter} className='stopBtn'>
        Stop Meter
      </button>
      {meterData && (
        <div>
          <p>Current reading: {meterData.consumed} Timestamp: {meterData.timestamp}</p>
          {blink &&(<Blink/>)}
          <Graph meterData={meterData} />
        </div>
      )}
    </div>
  );
};

export default Meter;
