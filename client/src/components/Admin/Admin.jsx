import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import styles from "./styles.module.css";

function Admin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useNavigate()
  
	const handleLogin = async () => {
		try {
			const response = await axios.post("http://localhost:3001/get", {
				email,
				password,
			});
			console.log(response.data);
			const user = response.data.user;
			history.push({
				pathname: "../User/User.jsx",
				state: { user },
			});
		} catch (error) {
			console.log(error);
			// handle the error here
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
