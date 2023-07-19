import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import CardChart from '../CardChart/CardChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StorageMonthsChar = ({title}) => {

    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Estoque entre 2021/2022',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: '2021',
                data: labels.map(() => faker.datatype.number({ min: 900, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '2022',
                data: labels.map(() => faker.datatype.number({ min: 900, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <CardChart title={title} chart={<Line options={options} data={data} style={{ width: '100%', height: '600px' }} />}/>
        </div>
    )
}

export default StorageMonthsChar
