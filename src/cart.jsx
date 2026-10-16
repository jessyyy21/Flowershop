import { useState, useEffect } from "react"
import style from './cart.module.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Cart() {
    let [cart, setcart] = useState([])
    let navigate = useNavigate()
    useEffect(() => {
        getCart()
    }, [])
    function getCart() {
        axios.get("http://localhost:3000/cart")
            .then((response) => {
                setcart(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    function increase(id) {
        let product = cart.find((a) => a.id === id)
        if (product) {
            axios.patch("http://localhost:3000/cart/" + id, {
                quantity: Number(product.quantity || 1) + 1
            })
                .then(() => {
                    getCart()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    function decrease(id) {
        let product = cart.find((a) => a.id === id)
        if (product && Number(product.quantity || 1) > 1) {
            axios.patch("http://localhost:3000/cart/" + id, {
                quantity: Number(product.quantity || 1) - 1
            })
                .then(() => {
                    getCart()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    function del(id) {
        axios.delete("http://localhost:3000/cart/" + id)
            .then(() => {
                getCart()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    let total = cart.reduce((sum, a) => {
        return sum + Number(a.price) * Number(a.quantity || 1)
    }, 0)
    return (
        <div className={style.cartContainer}>
            <div className={style.cartBox}>
                <div className={style.cartHeader}>
                    <h3>🛒 My Cart</h3>
                    <span>×</span>
                </div>
                <div className={style.cartItems}>
                    {cart.map((a) => {
                        return (
                            <div className={style.cartItem} key={a.id}>
                                <div className={style.cartImage}>
                                    <img
                                        src={a.image}
                                        alt={a.name}
                                    />
                                </div>
                                <div className={style.cartName}>
                                    {a.name}
                                </div>
                                <div className={style.cartPrice}>
                                    ₹{a.price}
                                </div>
                                <div className={style.cartQuantity}>
                                    <button
                                        type="button"
                                        onClick={() => decrease(a.id)}
                                        disabled={Number(a.quantity || 1) <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{a.quantity || 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => increase(a.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Item Total */}
                                <div className={style.cartTotal}>
                                    ₹{Number(a.price) * Number(a.quantity || 1)}
                                </div>
                                {/* Delete */}
                                <button
                                    className={style.deleteBtn}
                                    onClick={() => del(a.id)}
                                >
                                    X
                                </button>
                            </div>
                        )
                    })}
                    {cart.length === 0 && (
                        <p>Your cart is empty!</p>
                    )}
                </div>
                <div className={style.cartSummary}>
                    <div className={style.summaryRow}>
                        <b>Total</b>
                        <b>₹{total}</b>
                    </div>
                    <div className={style.summaryRow}>
                        <b>Total (including discount)</b>
                        <b>₹{total}</b>
                    </div>
                </div>
                <div className={style.cartFooter}>
                    <button
                        className={style.closeBtn}
                        onClick={() => navigate("/")}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className={style.checkoutBtn}
                        onClick={() => navigate("/buy")}
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Cart