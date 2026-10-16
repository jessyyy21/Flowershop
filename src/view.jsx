import { useState ,useEffect} from "react";
import {useParams , useNavigate} from 'react-router-dom'
import axios from "axios";
import style from "./view.module.css"

function View(){
const data =useParams()
const navigate = useNavigate();
let[pro,setpro]=useState({})
useEffect(()=> {
    axios.get("http://localhost:3000/Flowers/"+data.id)
   .then((response) => {
        console.log(response.data)
        console.log(response.data.image)
        setpro(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
},[])
  function puts(a) {
        axios.post("http://localhost:3000/cart", a)
            .then((response) => {
                console.log("Added to cart");
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
 return (
    <div className={style.container}>
        <div className={style.col}>
            <div className={style.prodInfoMain}>

                <div className={style.row}>

                    {/* Product Image */}
                    <div className={style.imageCol}>
                        <div className={style.productImage}>
                            <img
                                src={pro.image}
                                className={style.image}
                                alt={pro.name}
                            />

                            <span className={style.tag2}>
                              
                            </span>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className={style.detailsCol}>
                        <div className={style.productDetail}>

                            <h5 className={style.name}>
                                <a href="#">
                                    {pro.name}
                                </a>

                                <a href="#">
                                    <span>Fresh Flowers</span>
                                </a>
                            </h5>

                            <p className={style.priceContainer}>
                                <span>₹{pro.price}</span>
                            </p>

                        </div>

                        <div className={style.description}>
                            <p>
                                Fresh {pro.name} flowers available at our
                                flower shop. Perfect for gifting and special
                                occasions.
                            </p>
                        </div>

                        <div className={style.productInfo}>
                            <button
                                className={style.cartBtn}
                                onClick={() => puts(pro)}
                            >
                                Add to Cart 🛒
                            </button>

                            <button type="button" 
                            onClick={() => navigate("/buy")}
                            className={style.buyBtn}>
                                Buy Now
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
);
}

export default View;