import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../component/product.js";
import Loader from "../component/Loader.js";
import Message from "../component/message.js";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message varient="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product pro={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
