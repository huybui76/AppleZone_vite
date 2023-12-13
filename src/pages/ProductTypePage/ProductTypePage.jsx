import { useState, useEffect } from 'react'
import { Col, Pagination, Row } from 'antd'
import { WrapperProducts } from './style'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import logo2 from '../../assets/logo2.svg'
import slide1 from '../../assets/animate1.webp'
import ProductCard from '../../components/ProductCard/ProductCard'
import * as ProductService from '../../services/ProductService'
import { Skeleton } from 'antd'

import './ProductTypePage.css'

const ProductTypePage = () => {
  const { product } = useParams()
  const [products, setProducts] = useState([])
  const searchProduct = useSelector((state) => state?.product?.search)
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1
  })

  const searchDebounce = useDebounce(searchProduct, 500)

  useEffect(() => {
    const fetchProductType = async (type, page, limit) => {
      const res = await ProductService.getProductsType(type, page, limit)
      if (res?.status === 'OK') {
        setProducts(res?.data)
        setPanigate({ ...panigate, total: res?.totalPage })
      }
    }

    if (product) {
      fetchProductType(product, panigate.page, panigate.limit)
    }
  }, [product, panigate.page, panigate.limit])

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize })
  }

  const renderProductCards = (products) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      return null
    }

    return (
      <WrapperProducts>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            productId={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            totalSales={product.totalSales}
            timeLeft={product.timeLeft}
            rating={product.rating}
            discount={product.discount}
          />
        ))}
      </WrapperProducts>
    )
  }

  const renderProductSlides = (productData) => {
    if (productData && Array.isArray(productData) && productData.length > 0) {
      return renderProductCards(productData)
    } else {
      return Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} height={390} width={292.5} active />
      ))
    }
  }

  let typeOfProduct = ''

  switch (product) {
  case '6564aee73adaf4c11a499a6b':
    typeOfProduct = 'Iphone'
    break
  case '6564aefd3adaf4c11a499a72':
    typeOfProduct = 'Ipad'
    break
  case '6564af133adaf4c11a499a7c':
    typeOfProduct = 'Mac'
    break
  case '6564af273adaf4c11a499a89':
    typeOfProduct = 'Tai nghe'
    break
  case '6564af3f3adaf4c11a499a99':
    typeOfProduct = 'Phụ kiện'
    break
  case '6564af583adaf4c11a499aac':
    typeOfProduct = 'Apple Watch'
    break
  default:
    break
  }

  return (
    <div className="product-page-container">
      <div className="product-page">
        <div className="product">
          <div>
            <img className="product-image" src={slide1} alt="" />
          </div>
          <a className="logo-cate" href="a">
            <img src={logo2} alt="search icon" style={{ width: '32px', color: 'white', paddingBottom: '5px' }} />
            <h2 className="titleText">{typeOfProduct}</h2>
          </a>
        </div>

        <div style={{ marginBottom: '50px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
            <Row wrap={true} style={{ paddingTop: '10px', height: 'calc(100% - 20px)', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                {renderProductSlides(products)}

                <Pagination
                  defaultCurrent={panigate.page + 1}
                  total={panigate?.total}
                  onChange={onChange}
                  style={{ textAlign: 'center', marginTop: '10px' }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTypePage
