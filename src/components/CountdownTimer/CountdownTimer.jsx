import React, { useState, useEffect } from 'react'
import './CountdownTimer.css'

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    // Đặt ngày mục tiêu ở đây
    const targetDate = new Date('2023-12-31T23:59:59Z').getTime()
    const currentDate = new Date().getTime()
    const timeRemaining = targetDate - currentDate

    if (timeRemaining <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' }
    }

    const seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(2, '0')
    const minutes = String(Math.floor((timeRemaining / 1000 / 60) % 60)).padStart(2, '0')
    const hours = String(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)).padStart(2, '0')
    const days = String(Math.floor(timeRemaining / (1000 * 60 * 60 * 24))).padStart(2, '0')

    return { days, hours, minutes, seconds }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const renderCountdownItem = (label, value) => (
    <div className="countdown-item">
      <div className="text">{label}</div>
      <div className="countdown">{value}</div>
    </div>
  )

  return (
    <div className="countdown-container">
      {renderCountdownItem('Ngày', timeLeft.days)}
      <div className="colon">:</div>
      {renderCountdownItem('Giờ', timeLeft.hours)}
      <div className="colon">:</div>
      {renderCountdownItem('Phút', timeLeft.minutes)}
      <div className="colon">:</div>
      {renderCountdownItem('Giây', timeLeft.seconds)}
    </div>
  )
}

export default CountdownTimer
