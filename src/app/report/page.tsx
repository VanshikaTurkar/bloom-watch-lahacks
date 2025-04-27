'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from './page.module.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { createPortal } from 'react-dom'; 

export default function ReportPage() {
  const [reportType, setReportType] = useState<'general' | 'bloom' | 'animal'>('bloom');
  const [location, setLocation] = useState<{ address: string; coordinates?: { lat: number; lng: number } }>({ address: '' });
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string }>({ text: '', type: '' });

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [keywords, setKeywords] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Close popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    }
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopup]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportType || !location.address || !description) {
      alert("All fields required!");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "submissions"), {
        reportType,
        location: location.address,
        description,
        date: new Date(),
      });
      setMessage({ text: "Report submitted!", type: 'success' });
      setLocation({ address: '' });
      setDescription('');
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "Failed to submit report.", type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateDescription = async () => {
    if (!keywords.trim()) return;

    try {
      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          keywords,
          location: location.address,

        }),
      });
      const data = await res.json();
      if (data.description) {
        setDescription(data.description);
        setShowPopup(false);
        setKeywords('');
      }
    } catch (error) {
      console.error('Error generating description:', error);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />

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
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Location Input */}
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

          {/* Description Textarea */}
          <div>
            <label className={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the bloom, animal, or general issue..."
              className={styles.textarea}
            />
          </div>

          {/* Popup Button Row */}
          <div className={styles.submitContainer}>
            <button
              type="button"
              className={styles.generateButton}
              onClick={() => setShowPopup(!showPopup)}
            >
              Generate Description
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>

        {/* Popup box */}
        {showPopup && createPortal(
    <>
      {/* full-viewport overlay */}
      <div
        className={styles.popupOverlay}
        onClick={() => setShowPopup(false)}
      />

      {/* white box */}
      <div ref={popupRef} className={styles.popup}>
        <input
          type="text"
          placeholder="Enter keywords…"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className={styles.popupInput}
        />
        <button
          onClick={generateDescription}
          className={styles.popupButton}
        >
          Generate
        </button>
      </div>
    </>,
    document.body        // ⬅️  outside the card – no clipping
  )
}
      </div>
    </div>
  );
}
