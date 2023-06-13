import React, { useState } from 'react';
import './css/bid.css';
import firebase from 'firebase/compat/app';
function Bid(props) {
  const [energy, setEnergy] = useState('');
  const [price, setPrice] = useState('');
  const [error,setError]=useState('');
  let uuid=localStorage.getItem('user1')
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(energy,price)
    if(energy>props.energy){
    setError('Not enough energy in your grid')
    return;
    }
    const databaseRef = firebase.database().ref(`users/${uuid}/myBids`);
    databaseRef.set({ energy: energy ,price:price});
    const databaseRef2 = firebase.database().ref(`bids`);
    databaseRef2.push({ energy: energy,seller:props.acc,price:price,ownerUid:uuid });
    setEnergy('');
    setPrice('');
  };



  return (
    <form className="bid-submit-form" onSubmit={handleSubmit}>
       
      <h2 className="form-title">Submit a Bid</h2>
      <div className="form-group">
        <label htmlFor="energy">Energy (kW)  AVAILABLE:{props.energy}</label>
        <input
          type="number"
          id="energy"
          name="energy"
          value={energy}
          onChange={(event) => setEnergy(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price (ETH/kW)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-submit">
        Submit Bid
      </button>
      <div className='popup'>{error}</div>
    </form>
  );
}

export default Bid;