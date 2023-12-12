import React, { useEffect } from "react";
import "./ProductDetail.css";
import logo from "../../assets/logo.png";
import question from "../../assets/question_mark.png";
import productSet from "../../assets/setProduct.jpg";
import returnImg from "../../assets/return.jpg";
import shipping from "../../assets/shipping.jpg";
import contact from "../../assets/contact.jpg";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import gurantee from "../../assets/gurantee.jpg";
import { NavLink } from "react-router-dom";
import { messageSuccess, messageError } from "../../utils";
const ProductDetail = (props) => {
  const navigate = useNavigate();
  const orderItem = useSelector((state) => state.order)
  const handleCartIconClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    if (orderItem.isSuccessOrder) {
      messageSuccess('Đã thêm vào giỏ hàng')
    }
    return () => {
      dispatch(resetOrder())
    }
  }, [orderItem.isSuccessOrder])

  const dispatch = useDispatch();
  const dispatchProduct = () => {
    dispatch(
      addOrderProduct({
        orderItem: {
          name: props.product.name,
          amount: 1,
          image: props.product.image[0],
          price: props.product.price,
          product: props.product._id,
          countInStock: props.product.countInStock,
          discount: props.product.discount,
        },
      })
    );
  };

  const qrImage =
    "https://cdn.tgdd.vn/mwgcart/topzone/images/promote_loyalty/qr.png?v=1";
  const dienmayxanhLogo =
    "https://cdn.tgdd.vn/mwgcart/topzone/images/promote_loyalty/logo.png";
  const chPlay =
    "https://cdn.tgdd.vn/mwgcart/topzone/images/promote_loyalty/ggplay.png";
  const appStore =
    "https://cdn.tgdd.vn/mwgcart/topzone/images/promote_loyalty/appstore.png";
  return (
    <div className="product1">
      <aside className="product-intro">
        <div className="product-intro-image">
          {props.product?.image && props.product.image.length > 0 && (
            <img
              className="product-intro-image-src"
              src={props.product.image[0]}
              alt="iphone"
            />
          )}
        </div>
        <div></div>
      </aside>
      <aside className="product-side">
        <h1 className="product-side-nanme">{props.product?.name}</h1>
        <div className="product-side-sell">
          <h3 className="product-side-sell-discount" id="price">
            {props.product?.price ? (props.product.price - (props.product?.discount * props.product?.price) / 100).toLocaleString('vi-VN') : ""}đ
          </h3>
          <h5 className="product-side-sell-price">
            <strike>{props.product?.price ? (props.product?.price).toLocaleString('vi-VN') : ""}đ</strike>{" "}
          </h5>
        </div>
        <div className="product-side-ad">
          <img
            style={{ width: "30px", marginRight: "10px" }}
            src={dienmayxanhLogo}
            alt=""
          />
          <p className="product-side-ad-title"> Tích lũy quà tặng tặng VIP </p>
          <img src={question} style={{ width: "30px" }} alt="" />
        </div>
        <div className="product-side-title">
          <h5 className="product-side-title-detail">
            {props.product?.description}
          </h5>
        </div>
        <button className="buy-btn" onClick={dispatchProduct}>
          Thêm vào giỏ hàng
        </button>
        <div className="buy">
          <button className="buy-installment">
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "0px",
              }}
            >
              Mua trả góp 0%
            </p>
            <p style={{ marginTop: "5px" }}>Qua công ty tài chính</p>
          </button>
          <button className="buy-installment">
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "0px",
              }}
            >
              Trả góp 0% qua thẻ
            </p>
            <p style={{ marginTop: "5px" }}>Visa, Mastercard, JCB, Amex</p>
          </button>
        </div>

        <div className="product-side-set">
          <img style={{ width: "30px" }} src={productSet} alt="" />
          <p>Bộ sản phẩm gồm:</p>
          <h5>{props.product.productSet}</h5>
        </div>
        <div className="product-side-set">
          <img style={{ width: "30px" }} src={returnImg} alt="" />
          <p>Hư gì đổi nấy 12 tháng tại 3452 siêu thị trên toàn quốc</p>
        </div>
        <div className="product-side-set">
          <img style={{ width: "30px" }} src={gurantee} alt="" />
          <p>Bảo hành chính hãng 1 năm</p>
        </div>
        <div className="product-side-set">
          <img style={{ width: "30px" }} src={shipping} alt="" />
          <p> Giao hàng nhanh toàn quốc</p>
        </div>
        <div className="product-side-set">
          <img style={{ width: "30px" }} src={contact} alt="" />
          <p>Tổng đài:</p>
          <h5 style={{ color: "#2e84d6", fontSize: "20px" }}>1900.9696.42</h5>
          <p> (9h00 - 21h00 mỗi ngày)</p>
        </div>
        <div className="product-side-app">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img style={{ width: "80px" }} src={qrImage} alt="" />
            <p
              style={{
                marginBottom: "0px",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              Quét để tải app
            </p>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img style={{ width: "40px" }} src={dienmayxanhLogo} alt="" />
              <p>Quà tặng Vip</p>
            </div>
            <p
              style={{
                fontSize: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Tích & Sử dụng điểm cho khách hàng thân thiết
            </p>
            <p
              style={{
                fontSize: "13px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Sản phẩm của tập đoàn MWG
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img style={{ width: "150px" }} src={chPlay} alt="" />
            <img style={{ width: "150px" }} src={appStore} alt="" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetail;
