import { useEffect, useState } from "react";
import SHOP_DATA from "../shop.data";
import { connect } from 'react-redux';
import { updateCartItem } from "../redux/cart.actions";
import { useNavigate, useParams } from 'react-router-dom';

const Products = ({ cart, updateCartItem }) => {

    const { type } = useParams();
    const navigate = useNavigate()

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
        if (type) {
            setMaxLength(6)
            getAllItems()
        }
    }, [type])

    const getAllItems = () => {
        let allItems = []
        for (const category of SHOP_DATA) {
            if (category.routeName == type) {
                for (const item of category.items) {
                    allItems.push({
                        ...item, title: category.title,
                        code: category.routeName
                    })
                }
            }
        }
        if (maxLenght > allItems.length) {
            setMaxLength(allItems.length)
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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div style={{ paddingTop: 30 }} className="homeContainer ps-4 pe-4">
            {type ? <h3>{capitalizeFirstLetter(type)}</h3> : null}

            <div className="" style={{ paddingTop: 10 }}>
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
)(Products);