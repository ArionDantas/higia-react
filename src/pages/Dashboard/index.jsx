import CardViewStatict from '../../components/CardViewStatict/CardViewStatict';
import Navbar from '../../components/Navbar';
import StorageMonthsChar from '../../components/StorageMonthsChart/StorageMonthsChar';
import StorageTypeChart from '../../components/StorageTypesChart/StorageTypesChart';
import './style.css'
import PaidIcon from '@mui/icons-material/Paid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
// import Chart from "chart.js/auto";
// import { CategoryScale } from "chart.js";
// import { useState } from "react";

function Dashboard() {

    const colors = {
        red: '#DC4C64',
        blue: '#3B71CA',
        green: '#14A44D',
        yellow: '#E4A11B'
    }


    function nameCompany(nameCompany) {
        const name = `${nameCompany}`
        return name;
    }

    function getYear() {
        const date = new Date();
        const year = date.getFullYear();
        return year;
    }

    const style = {
        width: '100px',
    }

    return (
        <div className="section-container">
            <div className="content">
                <Navbar />
                <div className='shadow-sm px-2 py-3 mb-5 rounded d-flex align-items-center gap-3'>
                    <img src="src/img/logo-higia-bgremove.png" alt="" srcset="" style={style} />
                    <h3>Dashboard</h3>
                </div>


                <div className="d-flex align-items-center justify-content-around my-5">

                    <CardViewStatict titulo={'Faturamento (vendas)'} valor={'R$90 mil'} icon={<PaidIcon />} color={colors['red']} />

                    <CardViewStatict titulo={'Total de Pedidos'} valor={'2.520'} icon={<ListAltIcon />} color={colors['blue']} />

                    <CardViewStatict titulo={'Qtd. produtos vendidos'} valor={'2.521'} icon={<LocalOfferIcon />} color={colors['green']} />

                    <CardViewStatict titulo={'Qtd. de clientes'} valor={'5.000'} icon={<InsertEmoticonIcon />} color={colors['yellow']} />
                </div>

                <div className='px-3 py-4 mb-3 text-light' style={{ backgroundColor: colors['blue'] }}>
                    <h3 className=''>Dados sobre o estoque</h3>
                </div>
                <div className="sub-content d-flex justify-content-around w-100 gap-3 mb-5">
                    <StorageMonthsChar title={'Estoque atual'} />
                    <StorageMonthsChar title={'Estoque dos anos 2021/2022'} />
                </div>

                <div className='px-3 py-4 mb-3 text-light' style={{ backgroundColor: colors['green'] }}>
                    <h3 className=''>Tipos de produto no estoque</h3>
                </div>
                <div className='shadow py-3 mb-3 rounded'>
                    <div className="sub-content d-flex justify-content-start gap-3">
                        <StorageTypeChart title={'Estoque dividido em tipos'} />
                        <StorageTypeChart title={'Estoque 2021/2022'} />
                        <StorageTypeChart title={'Abastecer o estoque'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
