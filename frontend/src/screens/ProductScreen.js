import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, FormControl, Form, Card, Button, FormGroup, FormLabel, ListGroupItem } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";


const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);

    const { loading, product, error } = productDetails;



    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        //  history.push();
        navigate(`/cart/${id}?qty=${qty}`);
    }



    return (
        <>
            <Link className="btn btn-primary my-3" to="/">
                Go Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroupItem >
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: Rs-{product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: {product.description}
                            </ListGroupItem>
                        </ListGroup>

                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col> Price:</Col>
                                        <Col><strong>Rs-{product.price}</strong></Col>


                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col> Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In stock' : 'Out Of Stock'}</Col>


                                    </Row>
                                </ListGroupItem>
                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col >
                                                <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))
                                                    }

                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                                <ListGroupItem>
                                    <Button className="btn-block" type="button" onClick={addToCartHandler}
                                        disabled={product.countInStock === 0}
                                    >Add To Cart</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>

                    </Col>
                </Row>
            )}

        </>
    );
}

export default ProductScreen;