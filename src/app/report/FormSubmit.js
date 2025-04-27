import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the import path as needed

const FormSubmit = () => {
  const [formData, setFormData] = useState({
    type: "",
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

    const { type, location, description } = formData;

    if (!type || !location || !description) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "submissions"), {
        type,
        location,
        description,
        date: new Date(),
      });
      alert("Submission saved successfully!");
      setFormData({ type: "", location: "", description: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("An error occurred while saving the submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select...</option>
          <option value="bloom">Bloom</option>
          <option value="animal">Animal</option>
        </select>
        <br /><br />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormSubmit;
