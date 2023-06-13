import React from "react";
import "./css/BidCard.css"; // import CSS file
import EnergyTradingContract from '../EnergyTrading.json';
import { contractAdd } from './config.js';
import Web3 from 'web3';
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
function BidCard({ bid }) {
  const [web3, setWeb3] = useState('');
  const contractAddress = contractAdd;
  const [msg, setMsg] = useState('');
  const uid = localStorage.getItem('user1');
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
  useEffect(() => {
    handleConnect();
  }, [])

  let intervalId;
  const [transferred, setTransfer] = useState(0);
  function startEnergyMeter(energyAmount) {
    return new Promise((resolve, reject) => {
      let transferred = 0;
      intervalId = setInterval(() => {
        console.log(`Transferred: ${transferred} meters`);
        if (transferred < energyAmount) {
          transferred++;
          setTransfer(transferred)
        } else {
          clearInterval(intervalId);
          resolve(transferred);
        }
      }, 3000);
      document.querySelector('.stopBtn').addEventListener('click', () => {
        clearInterval(intervalId);
        reject('Meter transfer stopped');
      });
    });
  }

  function stopEnergyMeter() {
    clearInterval(intervalId);
    console.log('Meter transfer stopped');
  }
  const [se, setSender] = useState(0);
  const [re, setReciever] = useState(0);
  const buyEnergy = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const buyer = accounts[1];
      const energyAmount = parseInt(bid.energy);
      const cost = parseInt(bid.price);
      const sender = bid.ownerUid;
      const transferred = await startEnergyMeter(energyAmount);

      const energyTradingContract = new web3.eth.Contract(EnergyTradingContract.abi, contractAddress);
      energyTradingContract.methods. transferEnergyAndCarbonCredits(bid.seller, buyer, transferred, cost,transferred*5).send({ from: buyer, value: transferred * cost });
      const databaseRef = firebase.database().ref(`users/${sender}/myBids`);
      databaseRef.once('value')
        .then(snapshot => {
          setSender(snapshot.val().energy);
        })
      databaseRef.update({ energy: se - transferred })
      const databaseRef2 = firebase.database().ref(`users/${uid}/myBids`);
      databaseRef.once('value')
        .then(snapshot => {
          setReciever(snapshot.val().energy);
        })
        databaseRef2.update({ energy: re+transferred })
        const databaseRef3= firebase.database().ref(`users/${sender}/myRevenue`);
        let amt=transferred*cost
        databaseRef3.push({reciever:buyer,energy:transferred,price:cost,amount:amt});
      console.log('done');
      setMsg('Transfer successfull');
    } catch (error) {
      console.error(error);
    }
  };



  const stopMeter = () => {
    stopEnergyMeter();
  }
  return (
    <div className="bid-card">
      <div className="bid-card-header">
        <h3 className="bid-card-title">Bid #{bid.id}</h3>
        <button className="" onClick={buyEnergy}>
          Buy
        </button>
        <div className="stopBtn"></div>
      </div>
      <div className="bid-card-body">
        <div className="bid-card-row">
          <div className="bid-card-label">Energy:</div>
          <div className="bid-card-value">{bid.energy} kW</div>
        </div>
        <div className="bid-card-row">
          <div className="bid-card-label">Price:</div>
          <div className="bid-card-value">{bid.price} ETH/kW</div>
        </div>
        <div className="bid-card-row">
          <div className="bid-card-label">Transferred</div>
          <div className="bid-card-value"> {transferred}</div>
        </div>
        <div className="bid-card-row">
          <div className="bid-card-label">Status</div>
          <div className="bid-card-value"> {msg}</div>
        </div>
      </div>
    </div>
  );
}

export default BidCard;