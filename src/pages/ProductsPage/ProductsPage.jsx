import React, { useState, useEffect } from "react";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { productData as baseProductData } from "../../constants/products";
import "./ProductsPage.css";
import Loading from "../../components/Loading/Loading";
import * as ProductService from "../../services/ProductService";
import { productData as productAttached } from "../../constants/attached";
import Slider from "react-slick";
import plus from "../../assets/plus.jpg";
import { useParams } from "react-router-dom";

const ProductsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchDetailProduct = async (productId) => {
    setLoading(true);
    const res = await ProductService.getDetailsProduct(productId);
    if (res?.status === "OK") {
      setLoading(false);
      setProduct(res?.data);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailProduct(id);
    }
  }, [id]);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: "70px", zIndex: "-1" }}>

      <div style={{ background: "#efefef" }}>

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
  );
};

export default ProductsPage;
