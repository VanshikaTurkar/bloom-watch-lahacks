import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const ReportBloom: React.FC = () => {
  // State declarations
  const [activeTab, setActiveTab] = useState<'map' | 'report' | 'insight' | 'chat'>('report');
  const [reportType, setReportType] = useState<'general' | 'bloom' | 'animal'>('bloom');
  const [location, setLocation] = useState<{ address: string; coordinates?: { lat: number; lng: number } }>({ address: '' });
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string }>({ text: '', type: '' });

  // Handle tab click
  const handleTabClick = (tab: 'map' | 'report' | 'insight' | 'chat') => {
    setActiveTab(tab);
  };

  // Handle report type selection
  const handleReportTypeSelect = (type: 'general' | 'bloom' | 'animal') => {
    setReportType(type);
  };

  // Get current location
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!location.address) {
      setMessage({ text: 'Please enter a location', type: 'error' });
      return;
    }

    // Show submitting state
    setIsSubmitting(true);

    // Prepare report data
    const reportData = {
      type: reportType,
      location,
      description,
      timestamp: new Date().toISOString(),
    };

    // Simulate API call
    console.log('Submitting report:', reportData);

    // Reset the form after submission
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ text: 'Report submitted successfully!', type: 'success' });

      // Reset form state
      setDescription('');
      setLocation({ address: '' });
    }, 1000);
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {(['map', 'report', 'insight', 'chat'] as ('map' | 'report' | 'insight' | 'chat')[]).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm capitalize ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Call in
        </h1>

        {/* Report type selector */}
        <div className="flex space-x-2 mb-6">
          {(['general', 'bloom', 'animal'] as ('general' | 'bloom' | 'animal')[]).map((type) => (
            <button
              key={type}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                reportType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleReportTypeSelect(type)}
            >
              {type === 'general' ? 'Report' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Location input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <MapPin className="text-blue-500 mr-2" size={20} />
              <input
                type="text"
                value={location.address}
                onChange={(e) => setLocation((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Location - Autofill"
                className="w-full focus:outline-none text-gray-700"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Get Current
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                reportType === 'bloom'
                  ? 'Describe the bloom (color, size, location in water, etc.)'
                  : reportType === 'animal'
                  ? 'Describe the animal (species, behavior, condition, etc.)'
                  : 'Add description'
              }
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md font-medium transition-colors disabled:bg-green-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Message display */}
        {message.text && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
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
