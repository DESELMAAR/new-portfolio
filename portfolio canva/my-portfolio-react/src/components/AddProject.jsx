import React, { useState } from "react";
import { createProject } from "../api"; // Import API function

const AddProject = ({ onProjectAdded }) => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);
  const [link, setLink] = useState("");
  const [linkGithub, setLinkGithub] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("picture", picture); // Append the file
    formData.append("link", link);
    formData.append("link_github", linkGithub);
    formData.append("category", category);

    try {
      await createProject(formData);
      onProjectAdded(); // Refresh the list
      setName("");
      setPicture(null);
      setLink("");
      setLinkGithub("");
      setCategory("");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold mb-4">Add a New Project</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPicture(e.target.files[0])}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Demo Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="GitHub Link"
        value={linkGithub}
        onChange={(e) => setLinkGithub(e.target.value)}
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
        Add Project
      </button>
    </form>
  );
};

export default AddProject;