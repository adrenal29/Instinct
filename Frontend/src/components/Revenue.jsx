import React from 'react'
import { useState,useEffect } from 'react'
import './css/revenue.css'
import firebase from 'firebase/compat/app'
const Revenue = () => {
    const [buyers, setBuyer] = useState([{reciever:'-',energy:'-',price:'-',amount:'-'}]);
    // Get a reference to the Firebase database
    const uid=localStorage.getItem('user1')
    const database = firebase.database();
    useEffect(() => {
        // Get a reference to the Firebase databas
    
        // Get a reference to the data you want to traverse
        const dataRef = database.ref(`users/${uid}/myRevenue`);
        dataRef.on('value', (snapshot) => {
            const newBuyers = [];
            // Loop through each child of the snapshot
            snapshot.forEach((childSnapshot) => {
              // Get the value of the child and push it to the array
              const buyer = childSnapshot.val();
              newBuyers.push(buyer);
            });
            // Set the state with the new array of buyer
            setBuyer([...buyers,newBuyers])
            if(buyers.size==0){
                setBuyer(...buyers,{reciever:'-',energy:'-',price:'-',amount:'-'})   
            }
          });
        
    
        // Cleanup function to detach the listener
        return () => {
          dataRef.off();
        }
      }, []);
      console.log(buyers)
    return (
        <div className="buyer-table">
            <table>
                <thead>
                    <tr>
                        <th>Buyer</th>
                        <th>Energy(kWh)</th>
                        <th>Price ($/kWh)</th>
                        <th>Amount (WEI)</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {buyers.map((buyer, index) => (
                        <tr key={index}>
                            <td>{buyer[0].reciever}</td>
                            <td>{buyer[0].energy}</td>
                            <td>{buyer[0].price}</td>
                            <td>{buyer[0].amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Revenue