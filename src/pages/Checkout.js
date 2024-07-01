import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dash, Plus, Trash } from "react-bootstrap-icons";
import { updateCartItem } from "../redux/cart.actions";

const Checkout = ({ cart, updateCartItem }) => {

    const [total, setTotal] = useState(0)

    const handleRemove = (product) => {
        const item = cart.items.find(it => it.product.id === product.id);
        const prevQuantity = item ? item.quantity : 0;
        updateCartItem({
            product,
            quantity: prevQuantity - 1
        });
    }

    const handleAdd = (product) => {
        const item = cart.items.find(it => it.product.id === product.id);
        const prevQuantity = item ? item.quantity : 0;
        updateCartItem({
            product,
            quantity: prevQuantity + 1
        });
    }

    const handleDelete = (product) => {
        updateCartItem({
            product,
            quantity: 0
        });
    }

    useEffect(() => {
        let newTotal = 0
        if (cart.items && cart.items.length) {
            for (const item of cart.items) {
                newTotal = newTotal + (item.product.price * item.quantity)
            }
        }
        setTotal(newTotal)
    }, [cart])

    return <div style={{ padding: 20 }}>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    cart && cart.items.length > 0 &&
                    cart.items.map((item, index) =>
                        <tr>
                            <th class="h4" scope="row">{index + 1}</th>
                            <td class="h4">{item.product.name}</td>
                            <td class="h4">{item.product.price}</td>
                            <td>
                                <button onClick={() => handleAdd(item.product)} type="button" className="btn btn-outline-success btn-xs"><Plus size={30} /></button>
                                <span className="m-4 h4">{item.quantity}</span>
                                {item.quantity > 1 && <button onClick={() => handleRemove(item.product)} type="button" className="btn btn-outline-success btn-xs"><Dash size={30} /></button>}
                            </td>
                            <td class="h4">{item.product.price * item.quantity}</td>
                            <td class="h4"><button onClick={() => handleDelete(item.product)} type="button" className="btn btn-outline-success btn-xs"><Trash size={30} /></button></td>
                        </tr>
                    )
                }
                <tr>
                    <th scope="row">Total</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="h4">{cart.items.length ? total : '-'}</td>
                    <td>{cart.items.length > 0 && <button type="button" class="btn btn-success">CheckOut</button>}</td>
                </tr>
            </tbody>
        </table>
        {cart.items.length < 1 ? <div className="text-center">
            <h4>No items in cart</h4>
        </div> : null}
    </div>
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { updateCartItem }
)(Checkout);