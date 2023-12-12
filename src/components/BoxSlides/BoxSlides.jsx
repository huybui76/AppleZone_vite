import React, { useState, useEffect } from "react";
import appleIcon from "../../assets/apple.jpg";
import * as ProductService from "../../services/ProductService";
import ProductCard from "../ProductCard/ProductCard";
import Slider from "react-slick";
import "./BoxSlides.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BoxSlides = () => {
  const [products, setProducts] = useState({
    iphone: [],
    ipad: [],
    watch: [],
    mac: [],
    air: [],
  });

  const CustomPrevArrow = (props) => <div className="custom-prev-arrow" onClick={props.onClick}></div>;
  const CustomNextArrow = (props) => <div className="custom-next-arrow" onClick={props.onClick}></div>;


  const fetchProducts = async (type, limit, category) => {
    const res = await ProductService.getProductsType(type, 0, limit);
    if (res?.status === "OK") {
      setProducts((prevProducts) => ({ ...prevProducts, [category]: res?.data }));
    }
  };

  useEffect(() => {
    fetchProducts("6564aee73adaf4c11a499a6b", 15, 'iphone');
    fetchProducts("6564aefd3adaf4c11a499a72", 15, 'ipad');
    fetchProducts("6564af133adaf4c11a499a7c", 15, 'mac');
    fetchProducts("6564af273adaf4c11a499a89", 15, 'tai nghe');
    fetchProducts("6564af3f3adaf4c11a499a99", 15, 'phụ kiện');
    fetchProducts("6564af583adaf4c11a499aac", 15, 'watch');
  }, []);



  const renderProductCards = (products) => {
    if (!products || !Array.isArray(products)) {
      return null;
    }

    return products.map((product) => (
      <SwiperSlide key={product?._id} style={{ width: '292.5px' }}>
        {product ? (
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
        ) : (
          <Skeleton height={390} width={292.5} />
        )}
      </SwiperSlide>
    ));
  };

  return (
    <div>
      {["iPhone", "Ipad", "Mac", "Tai nghe", "Phụ Kiện", "Watch"].map((category, index) => (
        <div className="box-slide" key={index}>
          <a href="no" className="logo-cate">
            <img src={appleIcon} alt="search icon" style={{ width: "27px", color: "white", paddingBottom: '9px' }} />
            <h2 className="titleText">{category}</h2>
          </a>
          <div className="blocks-display">
            <>
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                  type: 'progress',
                }}
                modules={[Pagination]}
                className="mySwiper"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  overflowY: 'auto'
                }}
              >
                {renderProductCards(products[category.toLowerCase()])}
              </Swiper>
            </>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxSlides;
