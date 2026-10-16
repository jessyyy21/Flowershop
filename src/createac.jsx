import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import style from "./signin.module.css"

function CreateAccount() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("");
    const [confirm, setconfirm] = useState("");

    const navigate = useNavigate();

    function register() {
        if (!name || !email || !phone || !password || !confirm) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        axios.get("http://localhost:3000/user")
            .then((response) => {
                const exists = response.data.some(
                    (a) => a.email === email
                );

                if (exists) {
                    alert("This email is already registered");
                    return;
                }
              
                return axios.post("http://localhost:3000/user", {
                    name,
                    email,
                    phone,
                    password
                })
            })
            .then((response) => {
                if (response) {
                     alert("Account created successfully! Please sign in.")
                    navigate("/sign")
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={style.page}>
            <div className={style.loginBox}>
                <h2>Create Account</h2>
                <p className={style.subtitle}>
                    Register to continue shopping.
                </p>

                <label>Full Name</label>
                <input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter your name"
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                />

                <label>Phone Number</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    placeholder="Enter your phone number"
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Create a password"
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setconfirm(e.target.value)}
                    placeholder="Confirm your password"
                />

                <button type="button" className={style.loginBtn} onClick={register}>
                    Create Account
                </button>

                <p className={style.bottomText}>
                    Already have an account?
                </p>

                <button
                    className={style.createBtn}
                    onClick={() => navigate("/sign")}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default CreateAccount;
