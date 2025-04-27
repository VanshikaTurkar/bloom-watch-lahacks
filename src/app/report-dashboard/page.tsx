'use client';

import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import your db instance from firebaseConfig.js

type Report = {
  type: 'General' | 'Bloom' | 'Animal';
  location: string;
  description: string;
  date: string;
};

const reports: Report[] = [
  { type: 'Bloom', location: 'Lagoon Bay', description: 'Green bloom expanding rapidly.', date: '2025-04-26' },
  { type: 'Animal', location: 'Dockside', description: 'Injured pelican spotted.', date: '2025-04-25' },
  { type: 'General', location: 'Marina Beach', description: 'Water appears murky.', date: '2025-04-24' },
  { type: 'Bloom', location: 'North Shore', description: 'Small red bloom observed.', date: '2025-04-23' },
  { type: 'Animal', location: 'West Pier', description: 'Seagull with abnormal behavior.', date: '2025-04-22' },
  { type: 'General', location: 'City Dock', description: 'Floating debris spotted.', date: '2025-04-21' },
];

export default function ReportsDashboard() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]); // State to store the submissions
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State for errors
  
    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "submissions")); // Retrieve all documents from the 'submissions' collection
          const submissionsData = querySnapshot.docs.map(doc => ({
            id: doc.id, // Document ID
            ...doc.data() // Document data
          }));
          setSubmissions(submissionsData); // Set the submissions in state
        } catch (error) {
          console.error("Error getting submissions: ", error);
          setError("Failed to fetch submissions.");
        } finally {
          setLoading(false); // Set loading to false after the request is done
        }
      };
  
      fetchSubmissions();
    }, []); // The empty array makes this effect run only once when the component mounts
  
    if (loading) {
      return <div>Loading submissions...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  return (
    <main className={styles.page}>
      <Navbar />
      
      <div className={styles.card}>
        {/* Add Report Button */}
        {/* ADD CODE */}
        <div className={styles.headerRow}>
          <button
            className={styles.reportButton}
            onClick={() => router.push('/report')}
          >
            + New Report
          </button>
        </div>
        {/* ADD CODE */}
        <center><h1 className={styles.heading}>Reports Dashboard</h1></center>

        <div className={styles.grid}>
        {submissions.map((submission, index) => (
            <div key={index} className={styles.reportCard}>
              <div className={`${styles.badge} ${styles[submission.reportType]}`}>
                {submission.reportType}
              </div>
              <h2 className={styles.location}>{submission.location.address}</h2>
              <p className={styles.description}>{submission.description}</p>
              <p className={styles.date}>{new Date(submission.date.seconds * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}