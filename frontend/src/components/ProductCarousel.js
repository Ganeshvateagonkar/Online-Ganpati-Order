import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import products from '../products'

const ProductCarousel = () => {

    return (
        <Carousel pause='hover' className='bg-dark ganpati'>
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2 className='mt-5'>
                                {product.name} (Rs-{product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
export default ProductCarousel;