import React from 'react'

import './Flashsales.css'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import './Flashsales'
import Menu from '../SalesMenu/SalesMenu'


const Flashsales = () => {
    return (
        <div className='flashsales-container'>

            <div className="body-sale-container">
                <div className="flashsales-countdown">
                    <div className="flashsales-countdown-time">

                        <div className="flashsales-text">Flashsales</div>
                        <div className="countdowntimer">
                            <CountdownTimer />
                        </div>
                    </div>
                    <div className="buttons-flashsales">
                        <button className="left-button"></button>
                        <button className="right-button"></button>
                    </div>
                </div>
                <div className="menu-container">

                    <Menu />
                </div >



            </div>


        </div>
    )
}

export default Flashsales