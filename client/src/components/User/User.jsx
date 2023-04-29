import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get");
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.card}>
      <h1 className={styles.card__title}>User Details</h1>
      <table className={styles.table}>
        <thead className={styles.table__thead}>
          <tr>
            <th className={styles.table__th}>Email</th>
            <th className={styles.table__th}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className={styles.table__tr} key={index}>
              <td className={styles.table__td}>{user.email}</td>
              <td className={styles.table__td}>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
