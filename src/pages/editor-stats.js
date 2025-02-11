// pages/editor-stats.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import the Link component
import styles from '../styles/AdminDashboard.module.css'; // using .module.css for CSS modules

const EditorStats = () => {
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/editors`
        );
        setEditors(response.data);
      } catch (error) {
        console.error('Error fetching editors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEditors();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/status`,
        { status: newStatus }
      );
      setEditors(editors.map(editor =>
        editor._id === id ? response.data : editor
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className={styles.loading}>Loading editors...</div>;

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <div className={styles.backButtonContainer}>
        <Link href="/">
          <button className={`${styles.button} ${styles.back}`}>Back to Dashboard</button>
        </Link>
      </div>

      <h1>Editor Management</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {editors.map(editor => (
            <tr key={editor._id}>
              <td>{editor.firstName} {editor.lastName}</td>
              <td className={`${styles.status} ${styles[editor.status]}`}>
                {editor.status}
              </td>
              <td>{new Date(editor.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => updateStatus(editor._id, 'accept')}
                  className={`${styles.button} ${styles.accept}`}
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(editor._id, 'reject')}
                  className={`${styles.button} ${styles.reject}`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditorStats;