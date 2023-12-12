import React, { useState } from "react";
import "./ProductItem.css";
import Link from "antd/es/typography/Link";
import { NavLink } from "react-router-dom";
function ProductItem({ product }) {
  // const iphone15 = '../SalesMenu/images/black__efg76fuz5hm6_large.jpg';
  return (
    <div className="product-container">
      <NavLink
        // to=`/products/${}`
        to={`/products/${product._id}`}
        className="sale1-container"
      >
        <div className="img-container">
          <div className="sales-percentage1">

            <div className="sales-percentage">-{product.discount}%</div>
          </div>
          <div className="product-img">
            <img src={product.image[0]} alt={product.name} />
          </div>
        </div>
        <div className="product-name">{product.name} </div>
        <div className="product-price">
          <div className="sales-price">
            {product?.price
              ? (
                product.price -
                (product?.discount * product?.price) / 100
              ).toLocaleString("vi-VN")
              : ""}{" "}
            Đ
          </div>
          <div className="original-price">
            {(product?.price).toLocaleString("vi-VN")} Đ
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default ProductItem;
