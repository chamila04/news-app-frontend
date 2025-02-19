// pages/editor-stats.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/AdminDashboard.module.css';

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
      setEditors(editors.map(editor => editor._id === id ? response.data : editor));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className={styles.loading}>Loading editors...</div>;

  return (
    <div className={styles.container}>
      <h1>Editor Management</h1>
      <div className={styles.cardGrid}>
        {editors.map(editor => (
          <div key={editor._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>
                {editor.firstName} {editor.lastName}
              </h2>
            </div>
            <hr className={styles.divider} />
            <div className={styles.cardBody}>
              <p className={`${styles.status} ${styles[editor.status]}`}>
                Status: {editor.status}
              </p>
              <p className={styles.joined}>
                Joined: {new Date(editor.createdAt).toLocaleDateString()}
              </p>
            </div>
            <hr className={styles.divider} />
            <div className={styles.cardFooter}>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorStats;
