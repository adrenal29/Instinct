import { useDispatch } from 'react-redux';
import { setAccount } from '../Redux/metaMaskSlice';
import { useSelector } from 'react-redux';
import React,{useState} from 'react';
function MetaMask() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.metaMask.account);
  const [isConnecting, setIsConnecting] = useState(false);
 
  async function connectToMetaMask() {
    // const networkId = await window.ethereum.request({ method: 'net_version' });
    //   if (networkId === '1') {
    //     console.log('Connected to Ethereum main network');
    //   } else {
    //     console.log('Not connected to Ethereum main network');
    //   }
    setIsConnecting(true);
    if (window.ethereum) {
      
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts)
        console.log(accounts[0])
        dispatch(setAccount(accounts[0]));
      } catch (error) {
        console.error(error);
      }finally {
        setIsConnecting(false);
      }
    } else {
      console.error('MetaMask not detected');
    }
  }

  return (
    <div>
      {account ? (
        <p style={{ width: "" }}>Connected To: {account}</p>
      ) : (
        <button onClick={connectToMetaMask}>{isConnecting ? "Connecting..." : "Connect to MetaMask"}</button>
      )}
    </div>
  );
}

export default MetaMask;