import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./signin.module.css";

function Signin() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    function login() {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        axios.get("http://localhost:3000/user")
            .then((response) => {
                const user = response.data.find(
                    (a) =>
                        a.email === email &&
                        a.password === password
                );

                if (user) {
                    alert("Login successful! Welcome " + user.name);
                    navigate("/");
                } else {
                    alert("Invalid email or password. Please try again.");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={style.page}>
            <div className={style.loginBox}>
                <h2>Sign In</h2>
                <p className={style.subtitle}>
                    Welcome back! Please sign in.
                </p>

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Enter your password"
                />

                <button className={style.loginBtn} onClick={login}>
                    Sign In
                </button>

                <p className={style.bottomText}>
                    First time here?
                </p>

                <button
                    className={style.createBtn}
                    onClick={() => navigate("/account")}
                >
                    Create a New Account
                </button>
            </div>
        </div>
    );
}

export default Signin;
