import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import "./FindPage.css";
import { Col, Pagination, Row } from "antd";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { WrapperProducts } from "./style";
import "./style.js";
import * as ProductService from "../../services/ProductService";

import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";

const FindPage = () => {
  const { searchValue } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(2);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
  const fetAllProduct = async (search, limit) => {
    setLoading(true);
    const res = await ProductService.getAllProduct(search, limit);
    if (res?.status == "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchValue) {
      fetAllProduct(searchValue, 20);
   
    }
  }, []);
  return (
    <Loading isLoading={loading}>
      <div
        style={{
          marginLeft: "150px",
          marginTop: "50px",
          marginBottom: "50px",
          width: "100%",
        }}
      >
        <div style={{ width: "1270px", margin: "0 auto", height: "100%" }}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100% - 20px)",
            }}
          >
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
  );
};

export default FindPage;
