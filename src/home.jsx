import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
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

    

    return (
        <div style={{
            backgroundColor: "#fff4f7",
            minHeight: "100vh"
        }}>

            {/* Header */}
            <header style={{
                backgroundColor: "white",
                padding: "15px 25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                boxShadow: "0 2px 5px #ddd"
            }}>
                <h2
                    style={{ color: "#e75480", cursor: "pointer", margin: 0 }}
                    onClick={() => navigate("/")}
                >
                    Jaeysthtic
                </h2>

                <div style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap"
                }}>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/about")}
                    >
                        About Us
                    </button>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate("/account" )}
                    >
                        Login / Sign In
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/cart")}
                    >
                        🛒 Your Cart
                    </button>
                </div>
            </header>

            {/* Welcome */}
            <section style={{
                textAlign: "center",
                padding: "35px 15px",
                backgroundColor: "#ffe0eb"
            }}>
                <h1>Welcome to Jaeysthtic </h1>

                <p>Enjoy your favourite Flowers with every day!</p>

                <button
                    className="btn btn-danger"
                    onClick={() => navigate("/shop")}
                        
                >
                    Explore Products
                </button>
            </section>

            {/* Products */}
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


                            <br />

                        </div>

                    </div>

                </div>
            );
        })}

    </div>
</div>

            {/* Small Footer */}
            <footer style={{
                backgroundColor: "#382b32",
                color: "white",
                textAlign: "center",
                padding: "12px",
                marginTop: "20px",
                fontSize: "14px"
            }}>
                <p style={{ margin: "4px" }}>
                    Jaesthtic | Established in 2026
                </p>

                <p style={{ margin: "4px" }}>
                    © 2026 Jaesthtics. All Rights Reserved.
                </p>
            </footer>

        </div>
    );
}

export default Home
