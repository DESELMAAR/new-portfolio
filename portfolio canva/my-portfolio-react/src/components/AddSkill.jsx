import React, { useState } from "react";
import { createSkill } from "../api";

const AddSkill = ({ onSkillAdded }) => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null); // Use null for file state
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("picture", picture); // Append the file
    formData.append("category", category);

    try {
      await createSkill(formData); // Send FormData to the API
      onSkillAdded(); // Refresh the skill list
      setName("");
      setPicture(null); // Reset file input
      setCategory("");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Add a New Skill</h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="file" // Change input type to file
          accept="image/*" // Accept only image files
          onChange={(e) => setPicture(e.target.files[0])} // Set the selected file
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Skill
        </button>
      </div>
    </form>
  );
};

export default AddSkill;