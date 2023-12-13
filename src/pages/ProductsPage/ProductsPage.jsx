import { useState, useEffect } from 'react'
import ProductDetail from '../../components/ProductDetail/ProductDetail'
import './ProductsPage.css'
import * as ProductService from '../../services/ProductService'
import { useParams } from 'react-router-dom'

const ProductsPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  const fetchDetailProduct = async (productId) => {
    const res = await ProductService.getDetailsProduct(productId)
    if (res?.status === 'OK') {
      setProduct(res?.data)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetailProduct(id)
    }
  }, [id])


  return (
    <div style={{ marginTop: '70px', zIndex: '-1' }}>

      <div style={{ background: '#efefef' }}>

        <ProductDetail product={product} />

      </div>
      {/* <div className="attached">
        <p style={{ fontSize: "30px", fontWeight: "bold" }}>
          Phụ kiên nên có cho {baseProductData[0].name}
        </p>
        <Slider {...sliderSettings}>
          {productAttached.map((attachedProduct) => (
            <a className="product-slide" key={attachedProduct.id}>
              <img
                className="product-slide-image"
                src={attachedProduct.image}
                alt=""
              />
              <div className="product-slide-name">{attachedProduct.name}</div>
              <div className="product-slide-title">
                <p>
                  {(
                    attachedProduct.price -
                    (attachedProduct.price * attachedProduct.discount) / 100
                  ).toLocaleString("vi-VN")}₫
                </p>
                <p>
                  <strike>{attachedProduct.price.toLocaleString("vi-VN")}₫</strike>
                </p>
                <p>{attachedProduct.discount}%</p>
              </div>
            </a>
          ))}
        </Slider>
      </div> */}
      {/* ... (other sections) */}

    </div>
  )
}

export default ProductsPage
