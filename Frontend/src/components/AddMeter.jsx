import React, { useState } from 'react';
import './css/meter.css';

const mockSmartMeters = [
  { id: 'ABC123', name: 'Smart Meter 1' },
  { id: 'DEF456', name: 'Smart Meter 2' },
  { id: 'GHI789', name: 'Smart Meter 3' }
];

function AddMeter(props) {
  const [wifiOn, setWifiOn] = useState(false);
  const [smartMeters, setSmartMeters] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState("");

  // Turn on WiFi
  function handleWifiToggle() {
    setWifiOn(!wifiOn);
  }

  // Retrieve list of available smart meters
  function handleRefreshSmartMeters() {
    if (wifiOn) {
      // Simulate loading smart meters from the server
      setSmartMeters(mockSmartMeters);
    }
  }

  // Add and verify selected smart meter
  function handleAddSmartMeter() {
    if (selectedMeter) {
      // Simulate verifying the smart meter with the server
      const isSmartMeterVerified = mockSmartMeters.some(meter => meter.id === selectedMeter);
      if (isSmartMeterVerified) {
        props.onAddSmartMeter(selectedMeter);
      } else {
        console.error(`Failed to verify smart meter ${selectedMeter}`);
      }
    }
  }

  return (
    <div className="SmartMeterList">
      <label>
        <input type="checkbox" checked={wifiOn} onChange={handleWifiToggle} />
        Turn on WiFi
      </label>
      {wifiOn && (
        <div>
          <button onClick={handleRefreshSmartMeters}>Refresh Smart Meters</button>
          <h4>Available Smart Meters:</h4>
          <ul>
            {smartMeters.map(meter => (
              <li key={meter.id} onClick={() => setSelectedMeter(meter.id)}>
                {meter.name} ({meter.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AddMeter;