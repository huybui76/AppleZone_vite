import { useState, useEffect } from 'react'
import { Col, Pagination, Row, Button } from 'antd'
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
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(6) // Track the current page
  const [hasMore, setHasMore] = useState(true) // Flag to check if there are more products to load

  const getProductTypeLabel = (productId) => {
    switch (productId) {
    case '6564aee73adaf4c11a499a6b':
      return 'Iphone'
    case '6564aefd3adaf4c11a499a72':
      return 'Ipad'

    case '6564af133adaf4c11a499a7c':
      return 'Mac'
    case '6564af273adaf4c11a499a89':
      return 'Tai nghe'
    case '6564af3f3adaf4c11a499a99':
      return 'Phụ kiện'
    case '6564af583adaf4c11a499aac':
      return 'Apple Watch'
    default:
      return ''
    }
  }

  const typeOfProduct = getProductTypeLabel(product)

  const fetchProducts = async (type, page) => {
    setLoading(true)
    try {
      const res = await ProductService.getProductsType(type, 0, page)
      if (res?.status === 'OK') {
        setLoading(false)
        setProducts((prevProducts) => {
          const newProducts = res?.data.filter(
            (newProduct) => !prevProducts.some((existingProduct) => existingProduct._id === newProduct._id)
          )
          return [...prevProducts, ...newProducts]
        })
        setHasMore(res?.data.length !== res?.total)
      } else {
        setLoading(false)
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      setLoading(false)
      // Handle error, e.g., show an error message
    }
  }

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 6)
    }
  }

  const resetStateOnProductChange = () => {
    setProducts([])
    setPage(6)
    setHasMore(true)
  }

  useEffect(() => {
    resetStateOnProductChange()
  }, [product])

  useEffect(() => {
    if (product && hasMore) {
      fetchProducts(product, page)
    }
  }, [product, page, hasMore])

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
      return Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} height={390} width={292.5} active />)
    }
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


                {hasMore && (
                  <Button type="primary" className='button-load' onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Đang tải...' : 'Xem thêm'}
                  </Button>
                )}
                {!hasMore && <></>}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTypePage
