
import { useNavigate } from "react-router-dom";
import style from "./about.module.css";

function About() {
    let navigate = useNavigate();

    return (
        <div className={style.aboutPage}>

            <header className={style.header}>
                <h2 onClick={() => navigate("/")}>
                    Jaesthtic
                </h2>

                <button onClick={() => navigate("/")}>
                    Home
                </button>
            </header>

            <section className={style.content}>
                <h1>About Us</h1>

                <h3>Welcome to Jaesthtic 🍨</h3>

                <p>
                   Jaesthtic was established in 2026.
                    We provide fresh Flowers in for families and friends.
                </p>

                <h3>Contact Details</h3>

                <p>📍 Madurai, Tamil Nadu, India</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ Jaesthtic@gmail.com</p>

                <button
                    className={style.homeButton}
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </section>

            <footer className={style.footer}>
                © 2026Jaeysthtic. All Rights Reserved.
            </footer>

        </div>
    );
}

export default About;