import React from 'react';
import './css/Home.css';
import { Button } from 'antd';
import i from './img/landing.png'
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate=useNavigate();
    const login=()=>{
        navigate('/login');
    }
    const signup=()=>{
        navigate('/register')
    }
    return (
        <>
        <ul className='nav'>
            <li><h3 className='logo'>solarXChange</h3></li>
            <li className='opt'>
                <ul>
                    <li><a onClick={login}>LOGIN</a> </li>
                    <li onClick={signup}><a>SIGN UP</a></li>
                </ul>
            </li>
        </ul>
        <div className="landing">

            <div className="home-container">
                <div className="home-text">
                    <h1 className="home-title">Powering the Future: A Peer-to-Peer Energy Trading Platform</h1>
                    <p className="home-description">Out platform  enables individuals and businesses to buy and sell renewable energy directly with each other.</p>
                    <Button className="home-button" type="primary">Get Started</Button>
                </div>
                <div className="home-image">
                    
                </div>
            </div>
            <div className="img">
            <img src={i} alt="Solar Panels" />
            </div>
        </div>
        </>
          
    );
}

export default Home;