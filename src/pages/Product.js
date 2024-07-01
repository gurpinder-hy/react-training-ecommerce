import { useEffect, useState } from "react";
import SHOP_DATA from "../shop.data";
import { connect } from 'react-redux';
import { updateCartItem } from "../redux/cart.actions";
import { useNavigate, useParams } from 'react-router-dom';

const Product = ({ cart, updateCartItem }) => {

    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        if (id) {
            getItem()
        }
    }, [id])

    const getItem = () => {
        for (const category of SHOP_DATA) {
            for (const prodcut of category.items) {
                if (prodcut.id == id) {
                    setSelectedItem(prodcut)
                }
            }
        }

    }
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

    return <>
        {selectedItem ? <div style={{ padding: 50 }}>
            <div className="card">
                <div className="card">
                    <img src={selectedItem.imageUrl} style={{ height: "400px" }} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{selectedItem.name}</h5>
                        <h6 className="card-title">Price: $ {selectedItem.price}</h6>
                        <button type="button" className="btn btn-success" onClick={() => handleAddToCart(selectedItem)}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div> : null}
    </>;
};

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { updateCartItem }
)(Product);