import Navbar from '../../components/Navbar';
import StorageMonthsChar from '../../components/StorageMonthsChart/StorageMonthsChar';
import StorageTypeChart from '../../components/StorageTypesChart/StorageTypesChart';
import './style.css'
// import Chart from "chart.js/auto";
// import { CategoryScale } from "chart.js";
// import { useState } from "react";

function Dashboard() {

    function nameCompany(nameCompany) {
        const name = `${nameCompany}`
        return name;
    }

    function getYear() {
        const date = new Date();
        const year = date.getFullYear();
        return year;
    }

    // const data = {
    //     labels: ['Mon', 'Tue', 'Wed'],
    //     datasets: [
    //         {
    //             label: '369',
    //             data: [3, 6, 9],
    //             backgroundColor: ['aqua'],
    //             borderColor: 'black',
    //             borderWidth: 1
    //         },
    //         {
    //             label: '333',
    //             data: [3, 3, 3],
    //             backgroundColor: ['blue'],
    //             borderColor: 'black',
    //             borderWidth: 1
    //         }
    //     ]
    // }

    // const options = {

    // }

    return (
        <div className="section-container">
            <div className="content">
                <Navbar />
                <div className='shadow-sm px-2 py-3 mb-3 rounded text-center'>
                    <h3>Dashboard</h3>
                </div>

                <div className="sub-content d-flex justify-content-center gap-3">
                    <StorageTypeChart />
                    <StorageMonthsChar />
                </div>
                <div className="sub-content d-flex justify-content-center gap-3">
                    <StorageTypeChart />
                    <StorageMonthsChar />
                </div>
            </div>

        </div>
    )
}

export default Dashboard
