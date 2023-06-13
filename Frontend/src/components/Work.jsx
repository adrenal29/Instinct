import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MyContract from "../EnergyTrading.json";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import './css/work.css'
import MetaMask from "./Metamask";
import firebase from "firebase/compat/app";
import { contractAdd } from "./config";
import AddMeter from "./AddMeter";
function Work() {

  const getAccount = useSelector((state) => state.metaMask.account);
  let web = getAccount ? getAccount : null;
  const [hash, setHash] = useState('');
  const contractABI = MyContract.abi;
  const contractAddress = contractAdd;
  const [web3, setWeb3] = useState(null);
  const [meterId, setMeterId] = useState("");
  const [meterReading, setMeterReading] = useState("");
  const [meterData, setMeterData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const uuid = localStorage.getItem('user1');
  console.log(uuid)
  window.ethereum.enable();
  useEffect(() => {
    handleConnect();
  }, []);
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

  const handleAddMeter = async () => {
    const databaseRef = firebase.database().ref(`users/${uuid}/meter`)
    let meter='';
    await databaseRef.once('value')
      .then(snapshot => {
        meter= snapshot.val().meterId;
      })
      .catch(error => {
        console.error('Error fetching energy value:', error);
      });
      console.log(meter)
    if(meter==''){
    try {
      // Get the contract ABI and address from the JSON file


      // Create a contract instance using the ABI andaddress
      const myContract = new web3.eth.Contract(contractABI, contractAddress);

      // Use the first account in Metamask as the sender
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const sender = accounts[0];
      console.log(sender)
      // Call the `addMeter` function on the contract
      const tx = await myContract.methods.addMeter(0,0).send({ from: sender });
      setHash(tx.transactionHash);
      console.log("Transaction successful:", tx);

      // Show the success alert
      setShowSuccess(true);
      const databaseRef = firebase.database().ref(`users/${uuid}/meter`);
      databaseRef.set({ owner: sender, meterId: meterId, energy: 0,carbon:0 });
      // Hide the success alert after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding meter reading:", error);
    }
  }else{
    setError('Meter already registered for this account')
    console.log('already')
  }
  };


  const handleGetMeter = async () => {
    try {
      // Get the contract ABI and address from the JSON file

      // Create a contract instance usingthe ABI and address
      const myContract = new web3.eth.Contract(contractABI, contractAddress);

      // Call the `getMeter` function on the contract with the input meter ID
      const result = await myContract.methods.getMeter(meterId).call();

      // Set the meter data state to the result of the function call
      setMeterData(result);
    } catch (error) {
      console.error("Error getting meter reading:", error);
    }
  };

  return (
    <div>
      {!web ? (
        // 
        // <MetaMask/>
        <h2>Login through Metamask</h2>
      ) : (
        <div>
          {showSuccess && (
            <Alert
              status="success"
              variant="solid"
              sx={{
                borderRadius: "md",
                boxShadow: "md",
                bg: "green.500",
                color: "black",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "md",
                fontWeight: "bold",
                padding: "5",
                margin: "5",
                height: "16"
              }}
            >

              <AlertTitle mr={2}>Meter added successfully!</AlertTitle>
              <AlertDescription>Your meter has been registered with hash no.<span style={{ color: "green", fontSize: "20px" }}> {hash}</span></AlertDescription>
            </Alert>
          )}
          <AddMeter/>
          <h3 style={{ marginTop: "5vh" }}>Enter meter id for selected smart meter</h3>
          <label>
            Meter ID:
            <input type="text" className="meterInput" value={meterId} onChange={e => setMeterId(e.target.value)} />
          </label>
          {/* <label>
            Meter Reading:
            <input type="number" value={meterReading} onChange={e => setMeterReading(e.target.value)} />
          </label> */}
          <button onClick={handleAddMeter}>Add and Verify</button>

          <div style={{ marginTop: "15vh" }}>
            <h3 style={{ marginTop: "5vh" }}>Search for any meter on our network</h3>
            <label>
              Meter ID:
              <input className="meterInput" type="text" value={meterId} onChange={e => setMeterId(e.target.value)} />
            </label>
            <button onClick={handleGetMeter}>Get Meter Reading</button>
            {meterData && (
              <div>
                <p>Meter ID: {meterData[0]}</p>
                <p>Energy: {meterData[1]}</p>
                <p>Carbon Credits:{meterData[2]}</p>
                <p>Owner: {meterData[3]}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Work;