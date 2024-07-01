import { useEffect, useState } from "react";
import SHOP_DATA from "../shop.data";
import { connect } from 'react-redux';
import { updateCartItem } from "../redux/cart.actions";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = ({ cart, updateCartItem }) => {

    const navigate = useNavigate();

    const [maxLenght, setMaxLength] = useState(6)
    const [allItems, setAllItems] = useState([])

    const handleAddToCart = (product) => {
        const item = cart.items.find(it => it.product.id === product.id);
        const prevQuantity = item ? item.quantity : 0;
        updateCartItem({
            product,
            quantity: prevQuantity + 1
        });
        if (prevQuantity) {
            alert('Added One More ' + product.name)
        } else {
            alert('Added ' + product.name)
        }
    }

    useEffect(() => {
        setMaxLength(6)
        getAllItems()
    }, [])

    const getAllItems = () => {
        let allItems = []
        for (const category of SHOP_DATA) {
            for (const item of category.items) {
                allItems.push({
                    ...item, title: category.title,
                    code: category.routeName
                })
            }
        }
        setAllItems(shuffleArray(allItems))
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    return (
        <div style={{ paddingTop: 30 }} className="homeContainer ps-4 pe-4">
            <Carousel>
                <Carousel.Item>
                    <img style={{ height: 500, width: "100%" }} src={require("../images/banner-1.jpg")} alt="Chicago" className="landing-page-image" />
                    <Carousel.Caption>
                        <h3>Men's Fashion</h3>
                        <button onClick={() => navigate('/products/mens')} type="button" className="btn btn-light">Expolore Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ height: 500, width: "100%" }} src={require("../images/banner-2.jpg")} alt="Chicago" className="landing-page-image" />
                    <Carousel.Caption>
                        <h3>Women's Fashion</h3>
                        <button onClick={() => navigate('/products/womens')} type="button" className="btn btn-light">Expolore Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ height: 500, width: "100%" }} src={require("../images/banner-3.jpg")} alt="Chicago" className="landing-page-image" />
                    <Carousel.Caption>
                        <h3>Jackets</h3>
                        <button type="button" onClick={() => navigate('/products/jackets')} className="btn btn-light">Expolore Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <h3 style={{ paddingTop: 10 }} className="mt-4">Best Sellers</h3>
            <div className="">
                <div className="row">
                    {allItems.length && allItems.slice(0, maxLenght).map((item, index) =>
                        <div key={index} className="col-sm-4 my-4">
                            <div className="card">
                                <img onClick={() => {
                                    navigate('/product/' + item.id);
                                }} src={item.imageUrl} style={{ height: "400px", cursor: 'pointer' }} className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h6 className="card-title">Price: $ {item.price}</h6>
                                    <button type="button" className="btn btn-success" onClick={() => handleAddToCart(item)}>Add to cart</button>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
            {maxLenght < allItems.length && <div className="text-center">
                <button type="button" className="btn btn-dark" onClick={() => {
                    if (maxLenght < allItems.length) {
                        let newMax = maxLenght + 6
                        if (newMax > allItems.length) {
                            newMax = allItems.length
                        }
                        setMaxLength(newMax)
                    }
                }}>Load More</button>
            </div>}
        </div>
    );
};

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { updateCartItem }
)(Home);