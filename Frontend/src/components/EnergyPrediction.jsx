import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EnergyPrediction = () => {
    const [isSeller, setIsSeller] = useState(false);
    const [energyEstimation, setEnergyEstimation] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchEnergyEstimation();
    }, [isSeller]);

    const fetchEnergyEstimation = async () => {
        try {
            const response = await axios.post('http://localhost:3000/forecast', {

                "temperature": 28,
                "weatherCondition": 2,
                "timestamp": "2023-08-02 15:00:00"

            });

            const predictedEnergy = response.data.forecast;
            console.log(predictedEnergy)
            if (isSeller) {
                const installedSmartMeters = 10; // Replace with actual installed smart meters count
                setEnergyEstimation(predictedEnergy * installedSmartMeters);

                // Calculate estimated energy prediction for the next 6 hours
                const next6HoursPredictions = [];
                for (let i = 1; i <= 6; i++) {
                    const hourResponse = await axios.post('http://localhost:3000/forecast', {

                        // Provide parameters for the prediction API for each hour
                        "temperature": 28,
                        "weatherCondition": 2,
                        "timestamp": "2023-08-04 " + i + ":00:00"

                    });

                    const hourPredictedEnergy = hourResponse.data.forecast;
                    const estimation = parseInt(hourPredictedEnergy * installedSmartMeters + i * 10); // Example estimation data
                    console.log(estimation)
                    next6HoursPredictions.push({
                        name: `Hour ${i}`,
                        estimation,
                    });
                }

                setChartData(next6HoursPredictions);
            } else {
                setEnergyEstimation(predictedEnergy);
            }
        } catch (error) {
            console.error('Error fetching energy estimation:', error);
        }
    };

    return (
        <div>
            <h2>Energy Estimation</h2>
            <label>
                <input
                    type="checkbox"
                    checked={isSeller}
                    onChange={() => setIsSeller(!isSeller)}
                />
                Are you a Seller?
            </label>

            <div>
                <p>Estimated Energy Consumption: {energyEstimation} kWh</p>
                <LineChart width={600} height={300} data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="estimation" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default EnergyPrediction;
