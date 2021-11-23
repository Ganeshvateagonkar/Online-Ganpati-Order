import { Col, Row } from "react-bootstrap";
import Product from "../components/Product.js";
import ProductCarousel from "../components/ProductCarousel.js";
import { useSelector, useDispatch } from "react-redux";
import { listProduct } from "../actions/productActions.js";
import { useEffect } from "react";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";


const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);

    const { loading, error, products } = productList;
    console.log(products);
    useEffect(() => {

        dispatch(listProduct())
    }, [dispatch])

    return (
        <>
            <ProductCarousel />
            {loading ? <Loader /> : error ? <Message variant="danger" >{error}</Message> : (
                <Row>
                    {products && products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}




        </>
    );
}

export default HomeScreen;