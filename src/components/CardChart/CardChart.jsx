import React from 'react'
import './CardChart.css'

const CardChart = ({chart , title}) => {
    return (
        <div>
            <div className="shadow card">
                <div className='px-4 py-3 text-light bg-dark text-center'>
                    <h5>{title}</h5>
                </div>
                <hr className='m-0' />
                <div className='px-5 py-2 d-flex align-content-center'>
                    {chart}
                </div>
            </div>
        </div>
    )
}

export default CardChart
