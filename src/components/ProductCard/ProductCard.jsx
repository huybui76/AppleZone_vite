import React from "react";
import { FaStar, FaFireAlt, FaShoppingCart, FaRegBookmark } from "react-icons/fa";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";

const ProductCard = (props) => {
  // Console log for debugging
  // console.log('Product Card Props:', props);

  return (
    <NavLink to={`/products/${props.productId}`} className="productCard">
      <div className="element-container1">
        <img src={props.image[0]} alt="product" className="productImage" />
      </div>
      <div className="element-container2">
        <h3 className="title-card" >{props.name}</h3>
        <div className="bottom">
          {props.discount && <div className="discount">{`${(props.price - (props.price * props.discount) / 100).toLocaleString('vi-VN')}₫`}</div>}
          {props.price && <strike className="price">{`${props.price.toLocaleString('vi-VN')}₫`}</strike>}
          {props.discount && <small className="percent">{`-${props.discount}%`}</small>}
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
