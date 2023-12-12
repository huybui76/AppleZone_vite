import React, { useState, useEffect } from "react";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { productData } from "../../constants/products";
import "./ProductsPage.css";
import Loading from "../../components/Loading/Loading";
import * as ProductService from "../../services/ProductService";
import { productData as productAttached } from "../../constants/attached";
import Slider from "react-slick";
import plus from "../../assets/plus.jpg";
import { useParams } from "react-router-dom";
const ProductsPage = () => {
  const { id } = useParams();

  const iphoneAttached =
    "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-thumbtz-650x650.png";
  const charge =
    "https://cdn.tgdd.vn/Products/Images/9499/315355/s16/TimerThumb/de-sac-khong-day-magsafe-3-in-1-15w-anker-737-cube-y1811.png";
  const opLung =
    "https://cdn.tgdd.vn/Products/Images/60/315041/s16/op-lung-magsafe-iphone-15-plus-vai-apple-mt473-thumb-650x650.png";
  const [product, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const fetDetailProduct = async (id) => {
    setLoading(true);
    const res = await ProductService.getDetailsProduct(id);
    if (res?.status == "OK") {
      setLoading(false);
      setProducts(res?.data);
    } else {
      setLoading(true);
    }
  };
  useEffect(() => {
    if (id) {
      fetDetailProduct(id);
    }
  }, [id]);

  var settings = {
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
      <Loading isLoading={loading}>
        <div style={{ background: "#efefef" }}>
          <Loading isLoading={loading}>
            <ProductDetail product={product} />
          </Loading>
        </div>
        <div className="attached">
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            Phụ kiên nên có cho {productData[0].name}
          </p>
          <Slider {...settings}>
            {productAttached.map((product) => (
              <a className="product-slide">
                <img
                  className="product-slide-image"
                  src={product.image}
                  alt=""
                />
                <div className="product-slide-name">{product.name}</div>
                <div className="product-slide-title">
                  <p>
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toLocaleString("vi-VN")}
                    đ
                  </p>
                  <p>
                    <strike>{product.price.toLocaleString("vi-VN")}đ</strike>
                  </p>
                  <p>{product.discount}%</p>
                </div>
              </a>
            ))}
          </Slider>
        </div>
        <div className="attached">
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            Phụ kiên nên có cho Iphone
          </p>
          <div className="attached-list">
            <div className="attached-list-product">
              <img style={{ width: "200px" }} src={iphoneAttached} alt="" />
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                iPhone 15 Pro max
              </p>
              <p style={{}}> 34.990.000đ</p>
            </div>
            <div>
              <img style={{ width: "30px" }} src={plus} alt="" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div className="attached-list-more">
                <img style={{ width: "200px" }} src={charge} alt="" />
                <p style={{ width: "200px" }}>Đế sạc không dây MagSafe 3 in 1 15W Anker 737 Cube Y1811</p>
                <p>2.580.000₫</p>
                <p>
                  <strike>3.690.000₫</strike> -30%
                </p>
              </div>
              <div className="attached-list-more">
                <img style={{ width: "200px" }} src={opLung} alt="" />
                <p style={{ width: "200px" }}>
                  Ốp lưng Magsafe cho iPhone 15 Plus Vải Tinh Dệt Apple MT473
                </p>
                <p>1.435.000₫</p>
                <p>
                  <strike>1.690.000₫</strike> -15%
                </p>
              </div>
            </div>
            <div className="attached-list-buy">
              <h3 style={{ fontSize: "30px", margin: "2px" }}>39.005.000 ₫</h3>
              <h5 style={{ fontSize: "20px", margin: "10px" }}>
                <strike>40.370.000 ₫</strike>
              </h5>
              <button className="btn-buy">Mua sản phẩm</button>
            </div>
          </div>
        </div>
        <div className="rating">
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>
            Đánh giá sản phẩm này
          </p>
          <p>
            Nếu đã mua sản phẩm này tại AppleZone. Hãy đánh giá ngay để giúp hàng
            ngàn người chọn mua hàng tốt nhất bạn nhé!
          </p>
          <div></div>
        </div>
      </Loading>
    </div>
  );
};

export default ProductsPage;
