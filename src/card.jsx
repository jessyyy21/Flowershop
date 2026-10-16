
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Card() {

    let [card, setcard] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/Flowers")
            .then((response) => {
                setcard(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Add to Cart
    function puts(a) {

        axios.get("http://localhost:3000/cart")
            .then((response) => {

                // Check whether the same flower already exists
                let existing = response.data.find(
                    (item) => String(item.productId || item.id) === String(a.id)
                );

                if (existing) {

                    // Increase quantity if already exists
                    axios.patch(
                        "http://localhost:3000/cart/" + existing.id,
                        {
                            quantity: Number(existing.quantity || 1) + 1
                        }
                    )
                    .then(() => {
                        alert("Quantity Increased!");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                } else {

                    // Add new flower only once
                    axios.post("http://localhost:3000/cart", {
                        ...a,
                        productId: a.id,
                        quantity: 1
                    })
                    .then((response) => {
                        console.log("Added to cart", response.data);
                        alert("Added to Cart!");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div style={{
                backgroundColor: "#e4d9e2",
                minHeight: "100vh",
                padding: "30px 0"
            }}>

                <h1>Grab Yours</h1>

                <button
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px"
                    }}
                    type="button"
                    className="btn"
                    onClick={() => navigate("/cart")}
                >
                    Your Cart
                </button>

                <button
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px"
                    }}
                    type="button"
                    className="btn"
                    onClick={() => navigate("/account")}
                >
                    Create Account
                </button>

                <br />

                <div className="container text-center">
                    <div className="row">

                        {card.map((a) => {
                            return (
                                <div className="col-md-4 p-3" key={a.id}>

                                    <div
                                        className="card"
                                        style={{ width: "19rem" }}
                                    >

                                        <img
                                            src={a.image}
                                            className="card-img-top mx-auto d-block"
                                            alt={a.name}
                                            style={{
                                                width: "250px",
                                                height: "250px",
                                                objectFit: "cover"
                                            }}
                                        />

                                        <div className="card-body">

                                            <h5 className="card-title">
                                                {a.name}
                                            </h5>

                                            <p className="card-text">
                                                Fresh {a.name} flowers
                                                available at our flower shop.
                                            </p>

                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => puts(a)}
                                            >
                                                Add to Cart 🛒
                                            </button>

                                            <br />

                                            <button
                                                type="button"
                                                className="btn btn-link"
                                                onClick={() =>
                                                    navigate("/view/" + a.id)
                                                }
                                            >
                                                View More
                                            </button>

                                            <br />

                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
