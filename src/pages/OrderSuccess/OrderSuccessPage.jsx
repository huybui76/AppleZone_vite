import React from 'react'
import './index.css'
import success from '../../assets/success.png'
import { Button } from 'antd'
import { HomeTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'


const OrderSuccessPage = () => {
  const navigate = useNavigate()
  const handelGoHome = () => {
    navigate('/')
  }

  return (
    <div className='order-success-container'>
      <div className='order-success-area'>
        <div className='order-success-area1'>
          <img src={success} alt="search icon" className='search-icon' />
          <p className='order-thanks' >THANK YOU</p>
          <p className='order-sdt'>Chi tiết đơn hàng sẽ được gửi về số điện thoại của bạn</p>

          <Button type="primary" icon={<HomeTwoTone />} onClick={handelGoHome}>
            Quay Trở Lại Trang Chủ
          </Button>
        </div>
      </div>
    </div >
  )
}

export default OrderSuccessPage