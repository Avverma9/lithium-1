import React, { useEffect, useState} from "react";
import styles from "./styles.module.css";

function User() {
  const [users, setUsers] = useState([]);
  const  data  = JSON.parse(localStorage.getItem('users'))
  
  console.log('data from filmyGyaan' , data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        data && setUsers(data.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
 
    <div className={styles.card}>
      <h1 className={styles.card__title}>Contact us details</h1>
      <table className={styles.table}>
        <thead className={styles.table__thead}>
          <tr>
            <th className={styles.table__th}>Email</th>
            <th className={styles.table__th}>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className={styles.table__tr} key={index}>
              <td className={styles.table__td}>{user.email}</td>
              <td className={styles.table__td}>{user.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
