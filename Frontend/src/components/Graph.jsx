import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import './css/graph.css'
function Graph(props) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // Create a new Chart object when the component mounts
    const ctx = document.getElementById('myChart').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Meter Reading',
          data: [],
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Meter Reading'
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            ticks: {
              source: 'auto'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
          
        }
      }
    });
    setChart(newChart);

    // Clean up the Chart object when the component unmounts
    return () => {
      newChart.destroy();
    };
  }, []);

  useEffect(() => {
    // Update the chart data when the meterData prop changes
    if (chart && props.meterData) {
      chart.data.labels.push(props.meterData.timestamp);
      chart.data.datasets[0].data.push(props.meterData.consumed);
      chart.update();
    }
  }, [chart, props.meterData]);

  return (
    <canvas id="myChart"></canvas>
  );
}

export default Graph;