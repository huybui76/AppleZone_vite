import { useState, useEffect } from 'react'
import './SalesMenu.css'
import ProductItem from '../ProductItem/ProductItem'
import * as ProductService from '../../services/ProductService'
import { useDebounce } from '../../hooks/useDebounce'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Skeleton from 'react-loading-skeleton'

function Menu() {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [limit, setLimit] = useState(8)
  const [products, setProducts] = useState([])

  const fetchProductAll = async (searchDebounce, limit) => {

    const res = await ProductService.getAllProduct(searchDebounce, limit)
    if (res?.status === 'OK') {
      setProducts(res?.data)
    }

  }

  useEffect(() => {
    fetchProductAll(searchDebounce, limit)
  }, [searchDebounce, limit])

  const renderProductCards = (products) => {
    if (products && Array.isArray(products) && products.length > 0) {
      return products.map((product) => (
        <SwiperSlide key={product._id} style={{ width: '292.5px' }}>
          <ProductItem
            key={product._id}
            product={product}
          />
        </SwiperSlide>
      ))
    }
    else {
      // Render Skeleton for each slide if no data is available
      return Array.from({ length: 4 }).map((_, index) => (
        <SwiperSlide key={index} style={{ width: '292.5px' }}>
          <Skeleton height={390} width={292.5} active />
        </SwiperSlide>
      ))
    }
  }


  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      pagination={{
        clickable: true,
        type: 'progress'
      }}
      modules={[Pagination]}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'auto'
      }}
      className="Menu"
    >
      {renderProductCards(products)}
    </Swiper>
  )
}

export default Menu
