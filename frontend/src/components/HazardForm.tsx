import React, { useState } from "react";

export default function HazardForm({ onAddHazard }) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [hazardType, setHazardType] = useState("environmental");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHazard = { title, images, location, hazardType };
    onAddHazard(newHazard);
    setTitle("");
    setImages([]);
    setLocation("");
    setHazardType("environmental");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Report a Hazard</h2>

      <label className="block mb-2">Title</label>
      <input
        type="text"
        className="border border-gray-300 p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2">Images</label>
      <input
        type="file"
        multiple
        className="border border-gray-300 p-2 w-full mb-4"
        onChange={(e) => setImages([...e.target.files])}
      />

      <label className="block mb-2">Location</label>
      <input
        type="text"
        className="border border-gray-300 p-2 w-full mb-4"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <label className="block mb-2">Hazard Type</label>
      <select
        className="border border-gray-300 p-2 w-full mb-4"
        value={hazardType}
        onChange={(e) => setHazardType(e.target.value)}
      >
        <option value="environmental">Environmental</option>
        <option value="noise">Noise</option>
        <option value="accident">Accident</option>
        <option value="flood">Flood</option>
        {/* Add more options as needed */}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
      >
        Submit Hazard
      </button>
    </form>
  );
}
