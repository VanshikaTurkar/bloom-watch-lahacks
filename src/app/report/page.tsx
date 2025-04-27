'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from './page.module.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ReportBloom: React.FC = () => {
  const [reportType, setReportType] = useState<'general' | 'bloom' | 'animal'>('bloom');
  const [location, setLocation] = useState<{ address: string; coordinates?: { lat: number; lng: number } }>({ address: '' });
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string }>({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [keywords, setKeywords]   = useState('');

  // open popup
  const openPopup  = () => setShowPopup(true);
  // close popup (also clears keywords)
  const closePopup = () => { setShowPopup(false); setKeywords(''); };


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
          setMessage({ text: 'Unable to retrieve location.', type: 'error' });
        }
      );
    } else {
      setMessage({ text: 'Geolocation not supported.', type: 'error' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reportType || !location.address || !description) {
      alert('All fields are required!');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'submissions'), {
        reportType,
        location: location.address,
        description,
        date: new Date(),
      });
      alert('Submission saved successfully!');
      setLocation({ address: '' });
      setDescription('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('An error occurred while saving the submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateDescription = async () => {
    try {
      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords, location: location.address }),
      });
      const data = await res.json();
      if (data?.description) {
        setDescription(data.description);
        setShowPopup(false);
      } else {
        alert('Failed to generate description.');
      }
    } catch (error) {
      console.error('Error generating description:', error);
    }
  };

  return (
    <div className={styles.page}>
      {showPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h2>Generate Description</h2>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords..."
              className={styles.input}
            />
            {/*<button onClick={handleGenerateDescription} className={styles.generateButton}>
              Generate
            </button>*/}

            <button type="button" className={styles.generateButton} onClick={openPopup}>
              Generate Description
            </button>
          </div>
        </div>
      )}

      <div className={styles.navbarWrapper}><Navbar /></div>
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Report an Issue</h1>
          <div className={styles.reportTypeButtons}>
            {(['general', 'bloom', 'animal'] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleReportTypeSelect(type)}
                className={`${styles.reportTypeButton} ${reportType === type ? styles.activeReportType : ''}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label className={styles.label}>Location</label>
              <div className={styles.locationInputContainer}>
                <div className={styles.mapPin}><MapPin size={24} /></div>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) => setLocation((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter or Autofill Location"
                  className={styles.input}
                />
                <button type="button" onClick={getCurrentLocation} className={styles.autofillButton}>Autofill</button>
              </div>
            </div>

            <div className={styles.description}>
              <label className={styles.label}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the bloom, animal, or general issue..."
                className={styles.textarea}
              />
            </div>

            <div className={styles.submitContainer}>
              <button type="button" onClick={() => setShowPopup(true)} className={styles.generateButton}>Generate Description</button>
              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>

          {message.text && (
            <div className={`${styles.message} ${message.type === 'error' ? styles.error : styles.success}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          {/* stopPropagation so clicks inside card don’t close it */}
          <div className={styles.popupCard} onClick={e => e.stopPropagation()}>
            <h2 className={styles.popupHeading}>Generate Description</h2>

            <input
              type="text"
              className={styles.popupInput}
              placeholder="Enter keywords…"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
            />

            <div className={styles.popupActions}>
              <button
                className={`${styles.popupBtn} ${styles.popupSecondary}`}
                onClick={closePopup}
                type="button"
              >
                Cancel
              </button>

              <button
                className={`${styles.popupBtn} ${styles.popupPrimary}`}
                type="button"
                onClick={handleGenerateDescription}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportBloom;
