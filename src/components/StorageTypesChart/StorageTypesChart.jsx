import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
} from 'chart.js';
import { Bar, Pie, PolarArea } from 'react-chartjs-2';
import faker from 'faker';
import CardChart from '../CardChart/CardChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
);


const StorageTypesChart = ({title}) => {

    const labels = ['Medicamentos', 'Dermocosméticos', 'Perfumaria', 'Genéricos', 'Nutrição',];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Quantidade',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: `Total de produtos: ${faker.datatype.number({ min: 0, max: 1000 })}`,
                font: { weight: 'bold', size: '20' },
            },
        },
    };
    return (
        <div>
            <CardChart title={title}  chart={<Pie style={{ width: '400px', height: '400px' }} data={data}
            options={options}
            ></Pie>} />
        </div>
    )
}

export default StorageTypesChart
