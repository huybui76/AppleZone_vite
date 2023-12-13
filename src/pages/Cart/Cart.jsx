import './Cart.css'
import searchIcon from '../../assets/search-interface-symbol.png'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useMemo } from 'react'
import noneProduct from '../../assets/noneProduct.png'
import { Button, Input, Radio, Space, Form, message } from 'antd'
import * as OrderService from '../../services/OrderService'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import orderSlide, {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
  removeAllOrderProduct
} from '../../redux/slides/orderSlide'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import { messageSuccess, messageError } from '../../utils'
import AddressApi from '../../components/AddressComponent/AddressApi'

import { EnvironmentOutlined } from '@ant-design/icons'


const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(1)
  const [discountCode, setDiscountCode] = useState('')
  const [isDiscountValid, setIsDiscountValid] = useState('')
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [form] = Form.useForm()
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || '',
    phone: localStorage.getItem('userPhone') || '',
    address: localStorage.getItem('userAddress') || '',
    detailAddress: localStorage.getItem('userDetailAddress') || ''
  })
  const [totalAmountUSD, setTotalAmountUSD] = useState(0)
  const order = useSelector((state) => state.order)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddressSelect = (address) => {
    setSelectedAddress(address)
    form.setFieldsValue({
      address: `${address?.ward}, ${address?.district}, ${address?.province}`
    })
  }

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === 'increase' && !limited) {
      dispatch(increaseAmount({ idProduct }))
    } else if (type === 'decrease' && !limited) {
      dispatch(decreaseAmount({ idProduct }))
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }

  const handleDiscountApply = () => {

    if (discountCode === 'APPLEZONE') {
      setIsDiscountValid(10)
    } else if (discountCode === 'APPLE') {
      setIsDiscountValid(5)
    } else {
      setIsDiscountValid(null)
    }
  }

  const priceMemo = useMemo(() => {
    return order?.orderItems?.reduce((total, cur) => {
      return total + (cur.price - (cur.price * cur.discount) / 100) * cur.amount
    }, 0)
  }, [order])
  const priceDiscountMemo = useMemo(() => {
    return order?.orderItems?.reduce((total, cur) => {
      const totalDiscount = isDiscountValid || 0
      return total + (cur.price * cur.amount * (totalDiscount * cur.amount)) / 100
    }, 0) || 0
  }, [order, isDiscountValid])


  const totalPriceMemo = useMemo(() => {

    return priceMemo - priceDiscountMemo
  }, [priceMemo, priceDiscountMemo])


  useEffect(() => {
    const exchangeRate = 0.000041
    const newTotalAmountUSD = (totalPriceMemo * exchangeRate).toFixed(2)
    setTotalAmountUSD(newTotalAmountUSD)
  }, [totalPriceMemo])


  const handleHomeClick = () => {
    navigate('/')
  }
  const onFinish = async (values) => {

    try {
      setUser({
        name: values.name,
        phone: values.sdt,
        address: values.address,
        detailAddress: values.detailAddress
      })

      setIsModalOpen(false)

    } catch (error) {
      console.error('Error updating user information:', error)
    }
  }


  useEffect(() => {

    localStorage.setItem('userName', user.name)
    localStorage.setItem('userPhone', user.phone)
    localStorage.setItem('userAddress', user.address)
    localStorage.setItem('userDetailAddress', user.detailAddress)
  }, [user])

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }
  const priceDiscount = (item, discountPercentage) => {
    const discountedPrice = item - (item * discountPercentage) / 100
    return discountedPrice.toLocaleString()
  }
  const priceTotal = (price, discount, count) => {
    const priceTotal = (price - (price * discount) / 100) * count
    return priceTotal.toLocaleString()
  }
  const handlePlaceOrder = async (payStatus) => {

    if (!user.name || !user.phone || !user.address || !user.detailAddress) {
      messageError('Vui lòng nhập thông tin giao hàng trước khi đặt hàng.')
      return
    }

    const orderData = {
      fullName: user.name,
      phone: user.phone,
      address: `${user.detailAddress}, ${user.address}`,

      shippingMethod: selectedShippingMethod,
      orderItems: order?.orderItems?.map((item) => ({
        product: item.product,
        amount: item.amount
      })),
      itemsPrice: priceMemo,
      totalPrice: totalPriceMemo

    }


    try {
      const response = await OrderService.createOrder(orderData)

      if (response.status === 'OK' || response.status === 'OK' && payStatus.status === 'COMPLETED') {
        messageSuccess('Đặt hàng thành công!')
        const productsToRemove = order?.orderItems.map(item => item.product)
        dispatch(removeAllOrderProduct(productsToRemove))

        navigate('/order-success')

      } else {
        messageError('Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!')
      }
    } catch (error) {
      messageError('Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!')
      console.error('Error placing order:', error)
    }
  }


  return (
    <div className="cart-container">
      <div className="header-cart-container">
        <div className="header-cart">
          <div className="header-title">
            <h1 onClick={handleHomeClick}>Apple Zone | Giỏ Hàng</h1>
          </div>
          <div className="search-product">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="search-product-input"
            />
            <button className="search-product-button">
              <img
                src={searchIcon}
                alt="search icon"
                className="search-product-icon"
              />
            </button>
          </div>
        </div>
      </div>
      {order?.orderItems?.length !== 0 ? (
        <div>
          <div className="body-cart">
            <div className="body-cart-content">
              <div className="products-list">
                <div className="products-list-header">
                  <div className="item1">
                    <p className="item2">Sản Phẩm</p>
                  </div>
                  <div className="price1">Đơn Giá</div>
                  <div className="quantity1">Số lượng</div>
                  <div className="total1">Số tiền</div>
                  <div className="delete1">Thao Tác</div>
                </div>

                {order?.orderItems?.map((order) => (
                  <div className="item-container" key={order?.product}>
                    <div className="item__img-name">
                      <div className="item__img-name1">
                        <div className="item__img-container">
                          <img
                            src={order?.image}
                            alt={order?.name}
                            className="item-img"
                          />
                        </div>
                        <div className="item-container-name">
                          <div className="item-name">{order?.name}</div>
                        </div>
                      </div>
                    </div>
                    <div className="item-price">
                      <div className="item-price1">
                        {order?.price.toLocaleString()}
                      </div>
                      <div className="item-price2">
                        {priceDiscount(order?.price, order?.discount)}
                      </div>
                    </div>
                    <div className="item-quantity">
                      <div
                        className="item-quantity1"

                      >
                        <button className="minus"
                          disabled = {order?.amount === 1}
                          onClick={() =>
                            handleChangeCount(
                              'decrease',
                              order?.product,
                              order?.amount === 1
                            )
                          }>
                          <img
                            src="/minus.png"
                            alt="minus"
                            className="minus-icon"
                          />
                        </button>
                        <div
                          className="quantity"
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                          min={1}
                          max={order?.countInStock}
                        >
                          {order.amount}
                        </div>
                        <button
                          className="plus"
                          disabled = {order?.amount === order.countInStock}
                          onClick={() =>
                            handleChangeCount(
                              'increase',
                              order?.product,
                              order?.amount === order.countInStock,
                              order?.amount === 1
                            )
                          }
                        >
                          <img
                            src="/plus.png"
                            alt="plus"
                            className="plus-icon"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="total">
                      {priceTotal(order.price, order?.discount, order.amount)}
                    </div>
                    <div className="remove-item-area">
                      <button
                        className="remove-item-btn"
                        onClick={() => handleDeleteOrder(order?.product)}
                      >
                        <img
                          src="/close.png"
                          alt="cancer"
                          className="cancer"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="payment">
              {/* Information Container */}
              <div className="information-container">
                <div className="information-container1">
                  <div className="ship-container">
                    <p>Giao Tới</p>
                    <div className="button-info-add">
                      <Button icon={<EnvironmentOutlined />} onClick={() => setIsModalOpen(true)}>
                        Thêm mới
                      </Button>
                    </div>
                  </div>
                  {/* Modal Component */}
                  <ModalComponent
                    forceRender
                    title="Thêm địa chỉ"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <Form
                      name="basic"
                      labelCol={{ span: 9 }}
                      wrapperCol={{ span: 14 }}
                      onFinish={onFinish}
                      autoComplete="on"
                      form={form}
                    >
                      <Form.Item
                        label="Họ Và Tên"
                        name="name"
                        rules={[
                          { required: true, message: 'Vui lòng nhập thông tin!' }
                        ]}
                      >
                        <InputComponent />
                      </Form.Item>
                      <Form.Item
                        label="Số Điện Thoại"
                        name="sdt"
                        rules={[
                          { required: true, message: 'Vui lòng nhập thông tin!' },
                          {
                            pattern: /^0\d{9}$/,
                            message: 'Số điện thoại không hợp lệ.'
                          }
                        ]}
                      >
                        <InputComponent />
                      </Form.Item>

                      <Form.Item
                        label="Địa Chỉ"
                        name="address"
                        rules={[
                          { required: true, message: 'Vui lòng nhập thông tin Địa chỉ!' }
                        ]}
                      >

                        <AddressApi onAddressSelect={handleAddressSelect} />
                      </Form.Item>

                      <Form.Item
                        label="Địa Chỉ Cụ Thể"
                        name="detailAddress"
                        rules={[
                          { required: true, message: 'Vui lòng nhập thông tin!' }
                        ]}
                      >

                        <InputComponent maxLength={45} />
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                          Nhập
                        </Button>
                      </Form.Item>
                    </Form>
                  </ModalComponent>
                  {/* User Data */}
                  <div className="user-data">
                    <div className="user-data1">
                      <div className="user-data-name">
                        <div className="user-data-name1">{user.name}</div>
                      </div>
                      <div className="user-data-name">
                        <div className="user-data-name1">{user.phone}</div>
                      </div>
                    </div>
                    <div className="user-data-name3">
                      <div style={{ padding: '2px' }}>{user.detailAddress}</div>
                      <div style={{ padding: '2px' }}>{user.address}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Shipping Container */}
              <div className="shipping-container">
                <div className="shipping-container1">
                  <div className="voucher">
                    <p className="">Phương Thức Giao Hàng</p>
                    <div className="voucher-input-container1">
                      <Radio.Group onChange={(e) => setSelectedShippingMethod(e.target.value)} value={selectedShippingMethod}>
                        <Space direction="vertical" defaultValue={1}>
                          <Radio value={1}>Thanh Toán Khi Nhận Hàng COD</Radio>
                          <Radio value={2}>Nhận Hàng Tại Cửa Hàng</Radio>
                          <Radio value={3}>Thanh toán bằng PayPal</Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment Container */}
              <div className="payment-container">
                <div className="payment-container1">
                  <div className="voucher">
                    <p className="">Sử Dụng Mã Giảm Giá</p>
                    <div className="voucher-input-container1">
                      <Input className="voucher-input" placeholder="Mã Giảm Giá" onChange={(e) => setDiscountCode(e.target.value)} />
                      <Button type="primary" className="voucher-btn" value="default" onClick={handleDiscountApply}>
                        Áp Dụng
                      </Button>
                    </div>
                    {isDiscountValid && <div className="success-discount" style={{ color: '#ff0000' }}>-{isDiscountValid}%</div>}

                    {/* <hr /> */}
                    <div className="total-price">
                      <p className="total-price-total">Tổng Tiền</p>
                      <p className="total-price-total1">{totalPriceMemo.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              {selectedShippingMethod === 1 || selectedShippingMethod === 2 ? (
                <Button danger className="tbuy-btn" type="primary" onClick={handlePlaceOrder}>
                  Đặt Hàng
                </Button>
              ) : (
                <div>
                  <PayPalScriptProvider options={{ 'client-id': 'AbqXaYkFhdVTS8Q5aRt5dyAakPAoPciRk62aFH_wYXr0JCmYWrIoyRk8b_YcUmzEkrLpFQVBDZkr2l6Q', currency: 'USD' }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalAmountUSD,
                                currency_code: 'USD'
                              }
                            }
                          ]
                        })
                      }}
                      onApprove={async (data, actions) => {
                        // Logic when the payment is approved
                        const details = await actions.order.capture()
                        handlePlaceOrder(details)
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="none-product">
          <img src={noneProduct} alt="none-product" />
          <p>Giỏ hàng của bạn chưa có sản phẩm nào!</p>
        </div>
      )}
    </div>
  )
}

export default Cart
