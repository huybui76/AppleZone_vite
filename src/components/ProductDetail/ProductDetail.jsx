import React, { useEffect, useState } from "react";
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
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Button } from 'antd';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const orderItem = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log("dddddđ", thumbsSwiper)
  useEffect(() => {
    if (orderItem.isSuccessOrder) {
      messageSuccess('Đã thêm vào giỏ hàng');
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [orderItem.isSuccessOrder]);

  const handleCartIconClick = () => {
    navigate("/cart");
  };

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


  const dienmayxanhLogo =
    "https://cdn.tgdd.vn/mwgcart/topzone/images/promote_loyalty/logo.png";




  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <aside className="product-intro">
          <div className="product-intro-image">
            {props.product?.image && props.product.image.length > 0 && (
              <div className="image-product" style={{}}>
                <div className="image-product1" style={{}}>
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={20}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {props.product.image.map((image, index) => (
                      <SwiperSlide className="mySwiper2-item" key={index} >
                        <img
                          src={image}
                          style={{ height: '100%', }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="image-product2" style={{}}>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {props.product.image.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} alt={`Product Thumbnail ${index + 1}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
          </div>
        </aside>
        <aside className="product-side">
          <h1 className="product-side-name">{props.product?.name}</h1>
          <div className="product-side-sell">
            <h3 className="product-side-sell-discount" id="price">
              {props.product?.price ? (props.product.price - (props.product?.discount * props.product?.price) / 100).toLocaleString('vi-VN') : ""}<small>đ</small>
            </h3>
            <h5 className="product-side-sell-price">
              <strike>{props.product?.price ? (props.product?.price).toLocaleString('vi-VN') : ""}<small>đ</small></strike>{" "}
            </h5>
          </div>
          <div className="product-side-ad">
            <img
              style={{ width: "30px", marginRight: "10px" }}
              src={dienmayxanhLogo}
              alt=""
            />
            <p className="product-side-ad-title">+184.950 điểm tích lũy Quà Tặng VIP</p>
            <img src={question} style={{ width: "30px" }} alt="" />
          </div>
          <div className="product-side-title">
            <h5 className="product-side-title-detail">
              {props.product?.description}
            </h5>
          </div>

          <Button className="buy-btn" type="primary" onClick={dispatchProduct}> Thêm vào giỏ hàng</Button>


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

        </aside>
      </div>
    </div>
  );
};

export default ProductDetail;
