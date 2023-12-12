import React, { useState, useEffect } from "react";
import "./SalesMenu.css";
import ProductItem from "../ProductItem/ProductItem"; // Component hiển thị sản phẩm
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


function Menu() {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [limit, setLimit] = useState(8);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductAll = async (searchDebounce, limit) => {
    setLoading(true);
    const res = await ProductService.getAllProduct(searchDebounce, limit);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductAll(searchDebounce, limit);
  }, []);


  const renderProductCards = (products) => {
    if (!products || !Array.isArray(products)) {
      return null; // or an empty array, depending on your preference
    }


    return products.map((product) => (
      <SwiperSlide key={product._id} style={{ width: '292.5px' }}>
        <ProductItem
          key={product._id}
          product={product}

        />
      </SwiperSlide>))
  };
  return (
    <Loading isLoading={loading}>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        pagination={{
          clickable: true,
          type: 'progress',
        }}
        modules={[Pagination]}

        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'auto'
        }} className="Menu">

        {renderProductCards(products)}

        {/* {products?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))} */}
      </Swiper>
    </Loading>
  );
}

export default Menu;
