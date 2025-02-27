import React, { useEffect, useState } from "react";
import { getSkills, deleteSkill } from "../api";
import AddSkill from "../components/AddSkill"; // Import the AddSkill component
import { Loading } from "../components/Loading";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true); // Set loading to true before fetching data
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const handleDelete = async (id) => {
    await deleteSkill(id);
    fetchSkills(); // Refresh the list after deletion
  };

  const handleSkillAdded = () => {
    fetchSkills(); // Refresh the list after adding a new skill
    setIsModalOpen(false); // Close the modal after adding a skill
  };

  // Filter skills by name based on the search query
  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading ? (
       
        <Loading/>
      ) : (
        // Actual content
        <div className="text-center p-4 w-full mt-20">
          <div className="flex justify-between">
            <h1 className="text-2xl text-white ">Skills</h1>
            {localStorage.getItem("token")&&<button
              onClick={() => setIsModalOpen(true)} // Open the modal
              className="text-white px-4  rounded"
            >
              Add
            </button>}
          </div>

          {/* Search Input for Filtering by Skill Name */}
          <div className="mb-2 float-start">
            <input
              type="text"
              placeholder="Search skills by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              className="w-full max-w-md px-4 py-1  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Modal for AddSkill */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <AddSkill onSkillAdded={handleSkillAdded} />
                <button
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  className="mt-4 bg-red-600 text-white px-4  rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Skills List */}
          <div className="grid grid-cols-4 w-full justify-center gap-4">
            {/* Category 1 */}
            <div className="div1 bg-red-50 p-2  ">
              <ul className="grid gap-2 grid-cols-1 bg-red-50 opacity-85 overflow-hidden scrollbar-hide">
                {filteredSkills
                  .filter((skill) => skill.category == 1) // Filter skills where category is 1
                  .map((skill) => (
                    <li key={skill.id} className="font-light ">
                      <strong>{skill.name}</strong>
                     {localStorage.getItem("token") &&  <button
                        onClick={() => handleDelete(skill.id)}
                        className="bg-red-600 text-white px-2  rounded hover:bg-red-700"
                      >
                        X
                      </button>}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Category 2 */}
            <div className="div1 bg-red-50 p-2  ">
              <ul className="grid gap-2 grid-cols-1 rounded-lg bg-red-50 opacity-85 overflow-hidden scrollbar-hide">
                {filteredSkills
                  .filter((skill) => skill.category == 2) // Filter skills where category is 2
                  .map((skill) => (
                    <li key={skill.id} className="font-light">
                      <strong>{skill.name}</strong>
                     {localStorage.getItem("token") &&  <button
                        onClick={() => handleDelete(skill.id)}
                        className="bg-red-600 text-white px-2  rounded hover:bg-red-700"
                      >
                        X
                      </button>}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Category 3 */}
            <div className="div1 bg-red-50 p-2  ">
              <ul className="grid gap-2 grid-cols-1 rounded-lg bg-red-50 opacity-85 overflow-hidden scrollbar-hide">
                {filteredSkills
                  .filter((skill) => skill.category == 3) // Filter skills where category is 3
                  .map((skill) => (
                    <li key={skill.id} className="font-light">
                      <strong>{skill.name}</strong>
                    {localStorage.getItem("token") &&   <button
                        onClick={() => handleDelete(skill.id)}
                        className="bg-red-600 text-white px-2 rounded hover:bg-red-700"
                      >
                        X
                      </button>}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Category 4 */}
            <div className="div1 bg-red-50 p-2  ">
              <ul className="grid gap-2 grid-cols-1 rounded-lg  opacity-85 overflow-hidden scrollbar-hide">
                {filteredSkills
                  .filter((skill) => skill.category == 4) // Filter skills where category is 4
                  .map((skill) => (
                    <li key={skill.id} className="font-light">
                      <strong>{skill.name}</strong>
                      {localStorage.getItem("token") && <button
                        onClick={() => handleDelete(skill.id)}
                        className="bg-red-600 text-white px-2  rounded hover:bg-red-700"
                      >
                        X
                      </button>}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}