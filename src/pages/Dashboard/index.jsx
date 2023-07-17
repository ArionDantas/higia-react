import Navbar from '../../components/Navbar';
import './style.css'

export default function Dashboard() {

    function nameCompany(nameCompany) {
        const name = `${nameCompany}` 
        return name;
    }

    function getYear() {
        const date = new Date();
        const year = date.getFullYear();
        return year;
    }

    return (
        <div className="section-container">
            <div className="content">
                <Navbar />
                <div className="header">
                    <div className="name-company">
                        <h1>Agenda - {nameCompany('Corte do baiano')}</h1>
                    </div>
                    <div className="year">
                        <h1>{getYear()}</h1>
                    </div>
                </div>
                <div className="choose-hour">
                    <div className="get-month">
                        <input type="month" name="month" id="month" />
                    </div>
                    <div className="week">
                        <div className='box'>1 semana</div>
                        <div className='box'>1 semana</div>
                        <div className='box'>1 semana</div>
                        <div className='box'>1 semana</div>
                        <div className='box'>1 semana</div>
                    </div>
                </div>
            </div>
        </div>
    )
}