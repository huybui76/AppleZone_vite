import React, { useState, useEffect } from "react";
import "./ProductTypePage.css";
import slide1 from "../../assets/animate1.webp";
import slide2 from "../../assets/animate2.webp";
import slide3 from "../../assets/animate3.webp";
import Loading from "../../components/Loading/Loading";
import { WrapperProducts } from "./style";
import { Col, Pagination, Row } from "antd";
import appleIcon from "../../assets/apple.jpg";
import slide4 from "../../assets/animate4.webp";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { productData } from "../../constants/list";
import { productData1 } from "../../constants/list";
import { productData2 } from "../../constants/list";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
const ProductTypePage = (props) => {
  // Watch: 655ac5d41ad762f698f5e415

  let typeOfProdduct = "";
  const { product } = useParams();
  const [products, setProducts] = useState([]);
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(2);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const fetchProductType = async (type, page, limit) => {
    setLoading(true);

    const res = await ProductService.getProductsType(type, page, limit);
    if (res?.status == "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (product) {
      fetchProductType(product, panigate.page, panigate.limit);
    }
  }, [product, panigate.page, panigate.limit]);

  switch (product) {
    case "6564aee73adaf4c11a499a6b":
      typeOfProdduct = "Iphone";
      break;
    case "6564aefd3adaf4c11a499a72":
      typeOfProdduct = "Ipad";
      break;
    case "6564af133adaf4c11a499a7c":
      typeOfProdduct = "Mac";
      break;
    case "6564af273adaf4c11a499a89":
      typeOfProdduct = "Tai nghe";
      break;
    case "6564af3f3adaf4c11a499a99":
      typeOfProdduct = "Phụ kiện";
      break;
    case "6564af583adaf4c11a499aac":
      typeOfProdduct = "Apple Watch";
      break;
    default:
      break;
  }

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
  // const fetchProductByType = async (id) => {
  //   const res = await ProductService.getProductByType(id);
  //   setProductsByType(res);
  //   return res
  // }

  let data = [];


  // Xử lí lấy dữ liệu
  // const fetchProductAll = async(context) => {
  //   const limit = context?.queryKey && context?.queryKey[1]
  //   const search = context?.queryKey && context?.queryKey[2]
  //   const res = await ProductService.getAllProduct(search, limit)
  //   return res
  // }

  // const { isLoading, data: listProduct, isPreviousData } = useQuery({
  //   queryKey: ['products', limit, searchDebounce],
  //   queryFn: fetchProductAll,
  //   options: { retry: 3, retryDelay: 1000, keepPreviousData: true }
  // })
  return (
    <div className="product-page-container">
      <div className="product-page">
        <div className="product">
          <div>
            <img className="product-image" src={slide1} alt="" />
          </div>

          <a className="logo-cate" href="a">
            <img src={appleIcon} alt="search icon" style={{ width: "27px", color: "white", paddingBottom: '9px' }} />
            <h2 className="titleText">{typeOfProdduct}</h2>
          </a>
        </div>
        <Loading isLoading={loading}>
          <div
            style={{ marginBottom: "50px", width: "100%", display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ width: "1270px", margin: "0 auto", height: "100%" }}>
              <Row
                wrap={true}
                style={{
                  // flexWrap: "nowrap",
                  paddingTop: "10px",
                  height: "calc(100% - 20px)",
                  width: "100%", display: 'flex', justifyContent: 'center'
                }}
              >
                <Col
                  span={20}

                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%"
                  }}
                >
                  <WrapperProducts>
                    {products.map((product) => (
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
                    ))}
                  </WrapperProducts>
                  <Pagination
                    defaultCurrent={panigate.page + 1}
                    total={panigate?.total}
                    onChange={onChange}
                    style={{ textAlign: "center", marginTop: "10px" }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default ProductTypePage;
