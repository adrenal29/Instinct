import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Line } from 'react-chartjs-2';

const CarbonFootprint= ({ tradeHistory, consumptionHistory }) => {
  const [carbonFootprintHistory, setCarbonFootprintHistory] = useState([]);
  const [currentCarbonFootprint, setCurrentCarbonFootprint] = useState(0);

  // Calculate carbon footprint history based on trade and consumption history
  useEffect(() => {
    const history = tradeHistory.map((trade, index) => {
      const tradeImpact = trade * 0.1; // Example trade impact factor
      const consumptionImpact = consumptionHistory[index] * 0.05; // Example consumption impact factor
      return tradeImpact + consumptionImpact;
    });
    setCarbonFootprintHistory(history);
    setCurrentCarbonFootprint(history[history.length - 1]); // Set current carbon footprint
  }, [tradeHistory, consumptionHistory]);

  // Calculate carbon footprint rating based on the current carbon footprint
  const carbonFootprintRating = currentCarbonFootprint < 50 ? 'Low' : 'High';

  // Animate badge and graph
  const badgeProps = useSpring({
    transform: currentCarbonFootprint < 50 ? 'scale(1.2)' : 'scale(1)',
  });

  const graphProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  // Chart.js configuration
  const chartData = {
    labels: tradeHistory.map((_, index) => `Trade ${index + 1}`),
    datasets: [
      {
        label: 'Carbon Footprint',
        data: carbonFootprintHistory,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      {/* <animated.div style={badgeProps}>
        <p>Carbon Footprint Rating: {carbonFootprintRating}</p>
      </animated.div> */}
        <p>Carbon Footprint Rating: {carbonFootprintRating}</p>
      <animated.div style={graphProps}>
        <Line data={chartData} />
      </animated.div>
    </div>
  );
};

export default CarbonFootprint;
