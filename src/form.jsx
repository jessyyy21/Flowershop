import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import style from "./cacc.module.css"

function Cacc() {
    let [val, setval] = useState({
        user: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
        address: ""
    })

    let navigate = useNavigate()

    let [nameerr, setnameerr] = useState(false)
    let [mailerr, setmailerr] = useState(false)
    let [phoneerr, setphoneerr] = useState(false)
    let [pwerr, setpwerr] = useState(false)
    let [confirmerr, setconfirmerr] = useState(false)
    let [adderr, setadderr] = useState(false)
    let [sucs, setsucs] = useState(false)

    function change(event) {
        setval({
            ...val,
            [event.target.name]: event.target.value
        })

        if (event.target.name == "user") {
            setnameerr(false)
        }

        if (event.target.name == "email") {
            setmailerr(false)
        }

        if (event.target.name == "phone") {
            setphoneerr(false)
        }

        if (event.target.name == "password") {
            setpwerr(false)
        }

        if (event.target.name == "confirmpassword") {
            setconfirmerr(false)
        }

        if (event.target.name == "address") {
            setadderr(false)
        }
    }

    function send() {
        if (val.user == "") {
            setnameerr(true)
        }

        if (val.email == "") {
            setmailerr(true)
        }

        if (val.phone == "") {
            setphoneerr(true)
        }

        if (val.password == "") {
            setpwerr(true)
        }

        if (val.confirmpassword == "") {
            setconfirmerr(true)
        }

        if (val.address == "") {
            setadderr(true)
        }

        else {
            setnameerr(false)
            setmailerr(false)
            setphoneerr(false)
            setpwerr(false)
            setconfirmerr(false)
            setadderr(false)

            axios.post("http://localhost:3000/user", {
                name: val.user,
                email: val.email,
                phone: val.phone,
                password: val.password,
                confirmpassword: val.confirmpassword,
                address: val.address
            })
                .then(function (response) {
                    setsucs(true)

                    setval({
                        user: "",
                        email: "",
                        phone: "",
                        password: "",
                        confirmpassword: "",
                        address: ""
                    })

                    setTimeout(() => {
                        setsucs(false)
                    }, 2000)

                    console.log(response)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div className={style.page}>
            <div className={style.loginBox}>

                <h2 className="text-center">Create Account</h2>

                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="user"
                            value={val.user}
                            onChange={change}
                        />

                        {nameerr && (
                            <p className="text-danger mt-1">
                                Please fill the field
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={val.email}
                            onChange={change}
                        />

                        {mailerr && (
                            <p className="text-danger mt-1">
                                Please fill the field
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>

                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={val.phone}
                            onChange={change}
                        />

                        {phoneerr && (
                            <p className="text-danger mt-1">
                                Please fill the field
                            </p>
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={val.password}
                                onChange={change}
                            />

                            {pwerr && (
                                <p className="text-danger mt-1">
                                    Please fill the field
                                </p>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="confirmpassword"
                                value={val.confirmpassword}
                                onChange={change}
                            />

                            {confirmerr && (
                                <p className="text-danger mt-1">
                                    Please fill the field
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Delivery Address
                        </label>

                        <textarea
                            className="form-control"
                            name="address"
                            value={val.address}
                            onChange={change}
                            rows="3"
                        ></textarea>

                        {adderr && (
                            <p className="text-danger mt-1">
                                Please fill the field
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={send}
                        className={style.createBtn}
                    >
                        Create Account
                    </button>

                    {sucs && (
                        <div className="alert alert-success mt-3">
                            Successfully submitted
                        </div>
                    )}
                        
                       or
                    <button
                        type="button"
                        onClick={() => navigate("/sign")}
                        className={style.loginBtn}
                    >
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Cacc