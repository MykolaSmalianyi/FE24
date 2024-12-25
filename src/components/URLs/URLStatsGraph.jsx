import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const URLStatsGraph = ({ data, period }) => {
    const sortedData = data.sort((a, b) => new Date(a.time) - new Date(b.time));

    const chartData = {
        labels: sortedData.map(d => d.time),
        datasets: [
            {
                label: 'Clicks',
                data: sortedData.map(d => d.clicks),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: period,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy',
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default URLStatsGraph;