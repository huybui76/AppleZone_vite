import React from 'react'
import './ProductItem.css'
import { NavLink } from 'react-router-dom'
import { Progress, Space } from 'antd'

function ProductItem({ product }) {
  // Check if product is undefined
  if (!product) {
    return null // or return a loading indicator or placeholder
  }
  console.log('dddddđ', product.countInStock)
  return (
    <div className="product-container">
      <NavLink to={`/products/${product._id}`} className="sale1-container" style={{ textDecoration: 'none' }}>
        <div className="img-container">

          <div className="product-img">
            <img src={product.image[0]} alt={product.name} />
          </div>
        </div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">
          <strong className="sales-price">
            {product?.price
              ? (
                product.price -
                (product?.discount * product?.price) / 100
              ).toLocaleString('vi-VN')
              : ''}
            đ
          </strong>
          <div className="sale-container">

            <div className="original-price">
              {(product?.price).toLocaleString('vi-VN')}đ
            </div>
            <div className="sales-percentage1">
              <div className="sales-percentage"><strong>-{product.discount}</strong>%</div>
            </div>
          </div >
          <Progress percent={`${(product?.sold/product?.countInStock)*100}`} size={[190, 17]} strokeColor='#f36907' format={() => ''} />
        </div>
      </NavLink>
    </div>
  )
}

export default ProductItem
