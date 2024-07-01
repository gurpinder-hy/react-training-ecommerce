import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { login, signUp } from "../redux/cart.actions";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import store from '../redux/store';

const Login = ({ cart, login, signUp }) => {

    const navigate = useNavigate();

    useEffect(() => {
        let user = store.getState().cart.user
        if (user && user.name) {
            navigate('/Home')
        }
    })

    const [existingUser, setExistingUser] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const onLogin = (event) => {
        event.preventDefault();
        if (email.length < 8) {
            alert("Invalid Email")
            return
        }
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) == false) {
            alert("Invalid Email")
            return
        }
        if (password.length < 4) {
            alert("Password: Min Length 4")
            return
        }
        login({ email: email, password: password });
        let user = store.getState().cart.user
        if (user && user.name) {
            navigate('/Home')
        } else {
            alert("Invalid Credantials")
        }
    }

    const onSignUp = (event) => {
        event.preventDefault();
        if (name.length < 4) {
            alert("Name: Min Length 4")
            return
        }
        if (email.length < 8) {
            alert("Invalid Email")
            return
        }
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) == false) {
            alert("Invalid Email")
            return
        }
        if (password.length < 4) {
            alert("Password: Min Length 4")
            return
        }
        signUp({ email: email, password: password, name: name });
        navigate('/Home')
    }

    return <>
        <div className="container">
            {existingUser ?
                <div className="text-center" style={{ width: '70%', margin: 'auto' }}>
                    <h3 style={{ marginBottom: 10 }}>Login</h3><Form onSubmit={onLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>Email address</Form.Label>
                            <Form.Control style={{ width: '50%', margin: 'auto' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>Password</Form.Label>
                            <Form.Control style={{ width: '50%', margin: 'auto' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                        </Form.Group>
                        <Button style={{ width: '50%', margin: 'auto' }} variant="primary" type="submit">
                            Login
                        </Button>
                        <h6 style={{ marginTop: 20 }}>New User ?<button onClick={() => {
                            setExistingUser(false)
                            setPassword('')
                        }} style={{ padding: 0 }} className="btn btn-link"> Sign Up</button></h6>
                    </Form>
                </div> :
                <div className="text-center" style={{ width: '70%', margin: 'auto' }}>
                    <h3 style={{ marginBottom: 10 }}>Sign Up</h3>
                    <Form onSubmit={onSignUp}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>Name</Form.Label>
                            <Form.Control style={{ width: '50%', margin: 'auto' }} type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>Email address</Form.Label>
                            <Form.Control style={{ width: '50%', margin: 'auto' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>Password</Form.Label>
                            <Form.Control style={{ width: '50%', margin: 'auto' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                        </Form.Group>
                        <Button style={{ width: '50%', margin: 'auto' }} variant="primary" type="submit">
                            SignUp
                        </Button>
                        <h6 style={{ marginTop: 20 }}>Existing User ? <button onClick={() => {
                            setPassword('')
                            setExistingUser(true)
                        }} style={{ padding: 0 }} className="btn btn-link"> Login</button></h6>
                    </Form>
                </div>
            }
        </div>
    </>;
};


const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { login, signUp }
)(Login);