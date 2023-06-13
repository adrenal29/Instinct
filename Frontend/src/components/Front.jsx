import React from 'react'
import { useState } from 'react';
import './css/front.css'
import firebase from 'firebase/compat/app';
import Bid from './Bid';
import { useNavigate } from 'react-router-dom';
const Front = () => {
    const [meterId,setMeter]=useState('');
    const [connectedAccount,setAcc]=useState('')
    const [energy,setEnergy]=useState('');
    const uuid=localStorage.getItem('user1')
    const databaseRef = firebase.database().ref(`users/${uuid}/meter`);
    const navigate = useNavigate();
    const market=()=>{
        navigate('/listing')
    }
    // Fetch the current energy value from the database and update it
    databaseRef.once('value')
      .then(snapshot => {
        setEnergy(snapshot.val().energy);
        setAcc(snapshot.val().owner);
        setMeter(snapshot.val().meterId);
      })
      .catch(error => {
        console.error('Error fetching energy value:', error);
      });
    return (
        <>
            <div className="user-information">
                <div className="panel">
                    <h2 className="panel-title">Meter ID</h2>
                    <p className="panel-value">{meterId}</p>
                </div>
                <div className="panel">
                    <h2 className="panel-title">Surplus Energy</h2>
                    <p className="panel-value">{energy}</p>
                </div>
                <div className="panel">
                    <h2 className="panel-title">Connected Account</h2>
                    <p className="panel-value">{connectedAccount}</p>
                </div>
            </div>
            <div className="bid">
                <Bid meter={meterId} acc={connectedAccount} energy={energy}/>
            </div>

            <button className='market' onClick={market}>Explore Energy marketplace</button>
        </>
    )
}

export default Front