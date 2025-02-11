// pages/stats.js
import styles from '../styles/AdminDashboard.module.css';

const Stats = () => {
  return (
    <div className={styles.container}>
      <h1>Statistics</h1>
      <p>Total Editors: 10</p>
      <p>Active Editors: 7</p>
      <p>Inactive Editors: 3</p>
    </div>
  );
};

export default Stats;