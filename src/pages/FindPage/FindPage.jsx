import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row, Button } from 'antd'

import { WrapperProducts } from './style'
import * as ProductService from '../../services/ProductService'

import ProductCard from '../../components/ProductCard/ProductCard'
import './FindPage.css'
import { Skeleton } from 'antd'
import { Spin } from 'antd'

const FindPage = () => {
  const { searchValue } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(3) // Track the current page
  const [hasMore, setHasMore] = useState(true) // Flag to check if there are more products to load

  const fetchProducts = async (search, page) => {
    setLoading(true)
    try {
      const res = await ProductService.getAllProduct(search, page)
      if (res?.status === 'OK') {
        setLoading(false)
        setProducts((prevProducts) => {
          const newProducts = res?.data.filter(
            (newProduct) =>
              !prevProducts.some((existingProduct) => existingProduct._id === newProduct._id)
          )
          return [...prevProducts, ...newProducts]
        })
        setHasMore(res?.data.length !==res?.total)
      } else {
        setLoading(false)

      }
    } catch (error) {
      setLoading(false)

    }
  }

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 3)
    }
  }

  useEffect(() => {
    setProducts([]) // Reset products when the search value changes
    setPage(3) // Reset page to default value when the search value changes
    setHasMore(true) // Reset hasMore to default value when the search value changes
  }, [searchValue])


  useEffect(() => {
    if (searchValue && hasMore) {
      fetchProducts(searchValue, page)
    }
  }, [searchValue, page, hasMore])

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
    }
    else {
      return Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} height={390} width={292.5} active />
      ))
    }
  }


  return (
    <div className="product-page-container">
      <div className="product-page">
        <div style={{ marginBottom: '50px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
            <Row wrap={true} style={{ paddingTop: '60px', height: 'calc(100% - 20px)', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <Spin spinning={loading} size="large"> {/* Use Spin component for loading animation */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {renderProductSlides(products)}
                  </div>
                </Spin>

                {hasMore && (
                  <Button type="primary" className='button-load' onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
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

export default FindPage
