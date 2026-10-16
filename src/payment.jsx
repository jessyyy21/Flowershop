import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./payment.module.css";

function Payment() {
    const navigate = useNavigate();

    const [method, setmethod] = useState("COD");
    const [placed, setplaced] = useState(false);
    const [processing, setprocessing] = useState(false);

    const [order] = useState(() => {
        const saved = sessionStorage.getItem("pendingOrder");
        return saved ? JSON.parse(saved) : null;
    });

   
function confirmOrder() {
    axios.get("http://localhost:3000/cart")
        .then((res) => {
            let products = res.data;

            if (products.length === 0) {
                alert("Your cart is already empty");
                setplaced(true);
                return;
            }

            let requests = products.map((item) => {
                return axios.delete(
                    "http://localhost:3000/cart/" + item.id
                );
            });

            Promise.all(requests)
                .then(() => {
                    setplaced(true);
                    alert("Order Placed Successfully!");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Unable to clear the cart. Please try again.");
                });
        })
        .catch((err) => {
            console.log(err);
            alert("Unable to load cart items");
        });
}
        
if (placed) {
    return (
        <div className={style.page}>
            <div className={style.successBox}>
                <h2>✓ Order Placed Successfully!</h2>
                <p>Your Flowers will be delivered within 1 day.</p>

                <h3>Billing Challan</h3>

                <h3>Customer Details</h3>
                <p>Name: {order.name}</p>
                <p>Email: {order.email}</p>
                <p>Phone: {order.phone}</p>
                <p>Address: {order.address}</p>

                <h3>Ordered Items</h3>

                <table className={style.billTable}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.products.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name || item.productname}</td>
                                <td>{item.quantity || 1}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    ₹{Number(item.price || 0) *
                                        Number(item.quantity || 1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Grand Total: ₹{order.total.toFixed(2)}</h3>

                <button onClick={() => window.print()}>
                    Print Billing Challan
                </button>

                <button onClick={() => navigate("/")}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}


    
    return (
        <div className={style.page}>
            <div className={style.paymentBox}>
                <h2>Choose Payment Method</h2>

                <p className={style.subtitle}>
                    Select how you want to pay for your order.
                </p>

                <label className={style.option}>
                    <input
                        type="radio"
                        name="payment"
                        checked={method === "CARD"}
                        onChange={() => setmethod("CARD")}
                    />

                    <div>
                        <h3>💳 Card Payment</h3>
                        <p>Online card payment is not connected yet.</p>
                    </div>
                </label>

                <label className={style.option}>
                    <input
                        type="radio"
                        name="payment"
                        checked={method === "COD"}
                        onChange={() => setmethod("COD")}
                    />

                    <div>
                        <h3>💵 Cash on Delivery (COD)</h3>
                        <p>Pay when your Flowers arrive.</p>
                    </div>
                </label>

                <button
                    className={style.payBtn}
                    onClick={confirmOrder}
                    disabled={processing}
                >
                    {processing ? "Processing..." : "Confirm Order"}
                </button>

                <button
                    className={style.backBtn}
                    onClick={() => navigate("/buy")}
                    disabled={processing}
                >
                    Back to Billing
                </button>
            </div>
        </div>
    );
}

export default Payment;
