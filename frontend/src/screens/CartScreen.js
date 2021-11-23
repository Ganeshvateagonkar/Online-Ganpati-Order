import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, ListGroup, Image, FormControl, Button, Card, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, qty, id])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkOutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <>
            <Row style={{ marginTop: '30px' }}>
                <Col md={8}>
                    <h1 style={{ marginBottom: '40px', textAlign: 'center' }}>Shopping Cart</h1>
                    {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroupItem key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link style={{ textDecoration: 'none' }} to={`/products/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>Rs-{item.price}</Col>
                                        <Col md={2}>
                                            <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                                }

                                            </FormControl>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                </h2>
                                <h5>
                                    Rs-{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                                </h5>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkOutHandler}
                                >Proceed to checkout</Button>
                            </ListGroupItem>
                        </ListGroup>

                    </Card>
                </Col>


            </Row>
        </>
    )
}

export default CartScreen;