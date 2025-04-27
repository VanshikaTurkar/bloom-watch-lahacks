'use client';
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const ReportBloom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'report' | 'insight' | 'chat'>('report');
  const [reportType, setReportType] = useState<'general' | 'bloom' | 'animal'>('bloom');
  const [location, setLocation] = useState<{ address: string; coordinates?: { lat: number; lng: number } }>({ address: '' });
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string }>({ text: '', type: '' });

  const handleTabClick = (tab: 'map' | 'report' | 'insight' | 'chat') => {
    setActiveTab(tab);
  };

  const handleReportTypeSelect = (type: 'general' | 'bloom' | 'animal') => {
    setReportType(type);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            address: `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            coordinates: { lat: latitude, lng: longitude },
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setMessage({
            text: 'Unable to retrieve your location. Please enter it manually.',
            type: 'error',
          });
        }
      );
    } else {
      setMessage({
        text: 'Geolocation is not supported by your browser.',
        type: 'error',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location.address) {
      setMessage({ text: 'Please enter a location', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    const reportData = {
      type: reportType,
      location,
      description,
      timestamp: new Date().toISOString(),
    };

    console.log('Submitting report:', reportData);

    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ text: 'Report submitted successfully!', type: 'success' });
      setDescription('');
      setLocation({ address: '' });
    }, 1000);
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-teal-100 p-8">
      {/* Header Tabs */}
      <div className="flex justify-center mb-8 border-b border-gray-300">
        {(['map', 'report', 'insight', 'chat'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`mx-4 py-2 text-lg font-semibold capitalize ${
              activeTab === tab
                ? 'text-blue-600 border-b-4 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Form Card */}
      <div className="bg-white shadow-2xl rounded-2xl max-w-4xl w-full mx-auto p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Report an Issue</h1>

        {/* Report Type Selector */}
        <div className="flex justify-center gap-6 mb-8">
          {(['general', 'bloom', 'animal'] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleReportTypeSelect(type)}
              className={`px-6 py-3 rounded-full text-md font-medium transition ${
                reportType === type
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type === 'general' ? 'General' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Location</label>
            <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="flex items-center px-4">
                <MapPin className="text-blue-500" size={24} />
              </div>
              <input
                type="text"
                value={location.address}
                onChange={(e) => setLocation((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Enter or Autofill Location"
                className="flex-1 py-3 px-4 focus:outline-none text-gray-700"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2"
              >
                Autofill
              </button>
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                reportType === 'bloom'
                  ? 'Describe the bloom: color, size, location in water, etc.'
                  : reportType === 'animal'
                  ? 'Describe the animal: species, behavior, condition, etc.'
                  : 'Add a general description'
              }
              className="w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition disabled:bg-green-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>

        {/* Message Box */}
        {message.text && (
          <div
            className={`mt-6 p-4 rounded-lg font-semibold text-center ${
              message.type === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportBloom;
