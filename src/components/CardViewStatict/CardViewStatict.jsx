import React from 'react'
import './CardViewStatict.css'

const CardViewStatict = ({ titulo, valor, icon, color }) => {

    const style = {
        backgroundColor: color
    }

    return (
            <div className="d-flex justify-content-between align-items-center card-view-statict border px-4" style={style}>
                <div className="">
                    <p className='tittle-card-view-statict'>{titulo}</p>
                    <h4>{valor}</h4>
                </div>
                <div className="icon-card-view-statict">
                    {icon}
                </div>
            </div>
    )
}

export default CardViewStatict