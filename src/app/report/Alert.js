import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import your db instance from firebaseConfig.js

const SubmissionsList = () => {
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
    <div>
      <h1>All Submissions</h1>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <strong>Type:</strong> {submission.type} <br />
            <strong>Location:</strong> {submission.location} <br />
            <strong>Description:</strong> {submission.description} <br />
            <strong>Date:</strong> {new Date(submission.date.seconds * 1000).toLocaleString()} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmissionsList;
