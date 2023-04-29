import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/submit", {
        email,
        mobile,
      });
      console.log(response.data);
      setEmail("");
      setMobile("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.all}>
      <footer className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.logo_details}>
              <i className="fab fa-slack"></i>
              <span className={styles.logo_name}>Filmy Gyan</span>
            </div>
            <div className={styles.media_icons}>
              <a href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="-">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="-">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="-">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className={styles.link_boxes}>
            <ul className={styles.box}>
              <li className={styles.link_name}>Company</li>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/blog">Get started</a>
              </li>
            </ul>
          
            <ul className={styles.box}>
              <li className={styles.link_name}>Account</li>
              <li>
                <a href="/">Profile</a>
              </li>
              <li>
                <a href="/">My account</a>
              </li>
              <li>
                <a href="/">Prefrences</a>
              </li>
              <li>
                <a href="/">Purchase</a>
              </li>
            </ul>
           
          </div>
          <div className={styles.bottom}>
            <form onSubmit={handleSubmit}>

              <h3>Get in touch</h3>
              <p>Enter Your Email and Number We will contact you soon !</p>
              <div className={styles.inputs}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                />
              </div>
              <button type="submit">Connect</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
