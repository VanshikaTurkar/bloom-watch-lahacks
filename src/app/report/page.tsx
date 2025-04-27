'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar'; // ✅ importing your Navbar
import styles from './page.module.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the import path as needed


  

const ReportBloom: React.FC = () => {
  const [reportType, setReportType] = useState<'general' | 'bloom' | 'animal'>('bloom');
  const [location, setLocation] = useState<{ address: string; coordinates?: { lat: number; lng: number } }>({ address: '' });
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string }>({ text: '', type: '' });

  const handleReportTypeSelect = (type: 'general' | 'bloom' | 'animal') => {
    setReportType(type);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            address: `(${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            coordinates: { lat: latitude, lng: longitude },
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setMessage({ text: 'Unable to retrieve your location.', type: 'error' });
        }
      );
    } else {
      setMessage({ text: 'Geolocation is not supported.', type: 'error' });
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!location.address) {
  //     setMessage({ text: 'Please enter a location.', type: 'error' });
  //     return;
  //   }
  //   setIsSubmitting(true);

  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setMessage({ text: 'Report submitted successfully!', type: 'success' });
  //     setDescription('');
  //     setLocation({ address: '' });
  //   }, 1000);
  // };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const [formData, setFormData] = useState({
    reportType: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //const { reportType, location, description } = formData;
    console.log("ReportType: " + reportType)
    console.log("Location: " + location)
    console.log("Description: " + description)

    if (!reportType || !location || !description) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      console.log("ReportType: " + reportType)
      console.log("Location: " + location)
      console.log("Description: " + description)
      await addDoc(collection(db, "submissions"), {
        reportType,
        location,
        description,
        date: new Date(),
      });
      alert("Submission saved successfully!");
      setFormData({ reportType: "", location: "", description: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("An error occurred while saving the submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* 🧭 Navbar floating at top */}
      <div className={styles.navbarWrapper}>
        <Navbar />
      </div>

      {/* 🌟 Main content */}
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Report an Issue</h1>

          {/* Report Type Buttons */}
          <div className={styles.reportTypeButtons}>
            {(['general', 'bloom', 'animal'] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleReportTypeSelect(type)}
                className={`${styles.reportTypeButton} ${reportType === type ? styles.activeReportType : ''}`}
              >
                {type === 'general' ? 'General' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Location */}
            <div>
              <label className={styles.label}>Location</label>
              <div className={styles.locationInputContainer}>
                <div className={styles.mapPin}>
                  <MapPin size={24} />
                </div>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) => setLocation((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter or Autofill Location"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className={styles.autofillButton}
                >
                  Autofill
                </button>
              </div>
            </div>

            {/* Description */}
            <div className={styles.description}>
              <label className={styles.label}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  reportType === 'bloom'
                    ? 'Describe the bloom: color, size, location...'
                    : reportType === 'animal'
                    ? 'Describe the animal: species, behavior...'
                    : 'General description...'
                }
                className={styles.textarea}
              />
            </div>

            {/* Submit */}
            <div className={styles.submitContainer}>
              <button
              type="button"
              className="generateButton"
              onClick={() => setShowModal(true)}
            >
              Generate Description
            </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>

          {/* Message */}
          {message.text && (
            <div className={`${styles.message} ${message.type === 'error' ? styles.error : styles.success}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportBloom;