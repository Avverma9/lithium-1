/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
	try {
	  // Fetch the data from the API
    console.log('inside onclicj jsx')
	  const response = await axios.get("http://localhost:3001/get");
    const data  = response.data
    localStorage.setItem('users' , JSON.stringify(data))

    if (email === "admin@example.com" && password === "admin") {
		
		const user = { email: email, password: password };
		navigate("/User", { state: { user } });
	  } else {
		// Show an error message if the credentials are invalid
		alert("Invalid email or password");
	  }
	} catch (error) {
	  // Show an error message if there is an error fetching the data
	  alert("Error fetching data");
	}
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Section</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/login.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Log in</h2>
          <input
            type="text"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.btn} onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
