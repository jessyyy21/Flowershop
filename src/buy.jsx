
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./buy.module.css";

function Buy() {
    const [cart, setcart] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");

    const nameref = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/cart")
            .then((res) => setcart(res.data))
            .catch((err) => console.log(err));
    }, []);

    let total = cart.reduce((sum, item) => {
        return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);

    function checkout() {
        if (!name || !email || !phone || !address) {
            alert("Please fill all billing details");
            nameref.current.focus();
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        let order = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            products: cart,
            total: total,
            date: new Date().toLocaleDateString(),
            invoice: "VVK" + Date.now()
        };

        navigate("/payment", { state: order });
    }

    return (
        <div className={style.page}>
            <div className={style.checkoutBox}>
                <h2> Checkout Billing</h2>
                <p>Enter your details to complete your order.</p>

                <h3>Order Summary</h3>

                {cart.map((item) => (
                    <div className={style.product} key={item.id}>
                        <img
                            src={item.image || item.img}
                            alt={item.name || item.productname}
                        />

                        <div className={style.productInfo}>
                            <h4>{item.name || item.productname}</h4>
                            <p>Quantity: {item.quantity || 1}</p>
                        </div>

                        <b>
                            ₹{Number(item.price || 0) *
                                Number(item.quantity || 1)}
                        </b>
                    </div>
                ))}

                <h3>Order Total: ₹{total.toFixed(2)}</h3>

                <h3>Billing Details</h3>

                <input
                    ref={nameref}
                    type="text"
                    placeholder="Customer Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                />

                <textarea
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                />

                <button onClick={checkout}>
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default Buy;
