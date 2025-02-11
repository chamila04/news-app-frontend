import Link from 'next/link';
import styles from '../styles/AdminDashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.options}>
        <Link href="/editor-stats"> {/* Updated to match the new file name */}
          <button className={styles.button}>Manage Editor Status</button>
        </Link>
        <Link href="/stats">
          <button className={styles.button}>View Stats</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;