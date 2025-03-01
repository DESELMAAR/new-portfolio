import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { getSkills } from "../api";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

export default function About() {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState({ title: "", paragraph: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editParagraph, setEditParagraph] = useState("");
    const [profileImage, setProfileImage] = useState(null); // State for profile image

    useEffect(() => {
        fetchSkills();
        fetchContent();
        fetchProfileImage(); // Fetch profile image on component mount
    }, []);

    const fetchSkills = async () => {
        setIsLoading(true);
        try {
            const data = await getSkills();
            setSkills(data);
            setIsLoading(false);
        } catch (error) {
            // console.error("Error fetching skills:", error);
            setIsLoading(false);
        }
    };

    const fetchContent = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/content/1"); // Fetch content with ID 1
            const data = await response.json();
            if (data.data) {
                setContent(data.data);
                setEditTitle(data.data.title);
                setEditParagraph(data.data.paragraph);
            }
        } catch (error) {
            // console.error("Error fetching content:", error);
        }
    };

    const fetchProfileImage = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/images/1"); // Fetch profile image with ID 3
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                setProfileImage(data.data.url); // Use the URL from the JSON response
                // console.log(data.data.url);
                 // Log the image URL
            } else {
                // console.error("Failed to fetch profile image:", response.statusText);
            }
        } catch (error) {
            // console.error("Error fetching profile image:", error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/content", {
                method: "POST", // Use POST for storing or updating
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: 1, // Use ID 1 for the content
                    title: editTitle,
                    paragraph: editParagraph,
                }),
            });
            const data = await response.json();
            setContent(data.data);
            setIsEditing(false);
        } catch (error) {
            // console.error("Error saving content:", error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditTitle(content.title);
        setEditParagraph(content.paragraph);
    };

    const handleTruncateClick = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/content/truncate",
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            alert(data.message); // Show success message
            setContent({ title: "", paragraph: "" }); // Clear the content state
        } catch (error) {
            // console.error("Error truncating content:", error);
            alert("Failed to delete content");
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            let endpoint = "http://127.0.0.1:8000/api/images";
            let method = "POST"; // Default to store a new image

            if (profileImage) {
                // If a profile image already exists, update it
                endpoint = "http://127.0.0.1:8000/api/images/1";
                method = "PUT";
            }

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Image uploaded successfully");
                fetchProfileImage(); // Refresh the profile image
            } else {
                alert("Failed to upload image");
            }
        } catch (error) {
            // console.error("Error uploading image:", error);
            alert("Failed to upload image");
        }
    };

    const handleDeleteImage = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/images/truncate`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Image deleted successfully");
                setProfileImage(null); // Clear the profile image state
            } else {
                alert("Failed to delete image");
            }
        } catch (error) {
            // console.error("Error deleting image:", error);
            alert("Failed to delete image");
        }
    };

    // Filter skills where id matches specific values
    const filteredSkills = skills.filter(
        (skill) =>
            skill.id === 72 ||
            skill.id === 73 ||
            skill.id === 74 ||
            skill.id === 75 ||
            skill.id === 76 ||
            skill.id === 77 ||
            skill.id === 78 ||
            skill.id === 79 ||
            skill.id === 80 ||
            skill.id === 81 ||
            
            skill.id === 83 ||
            skill.id === 84 
    );

    return (
        <div className="h-full p-4 flex items-center justify-center">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 gap-4 w-full max-w-7xl">
                    <div className="text-center grid grid-cols-10 justify-center max-md:grid-cols-2 gap-2">
                        {/* Left Div (70% width) */}
                        <div className="col-span-6 p-2 grid grid-cols-1 items-center about bg-emerald-800 custom-shadow">
                            {isEditing ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full p-2 mb-2 text-black"
                                    />
                                    <textarea
                                        value={editParagraph}
                                        onChange={(e) => setEditParagraph(e.target.value)}
                                        className="w-full p-2 text-black"
                                        rows="4"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={handleSaveClick}
                                            className="bg-green-600 text-white py-1 px-4 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="bg-red-600 text-white py-1 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 items-center gap-2">
                                    <h1 className="text-3xl font-semibold mb-1 text-white">
                                        {content.title}
                                    </h1>
                                    <p className="text-gray-200">{content.paragraph}</p>
                                    <div>
                                        {localStorage.getItem("token") && (
                                            <>
                                                <button
                                                    onClick={handleEditClick}
                                                    className="bg-green-600 rounded-lg float-left ml-2 text-white shadow-md shadow-green-400 py-2 px-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={handleTruncateClick}
                                                    className="bg-green-600 rounded-lg float-left ml-2 text-white shadow-md shadow-green-400 py-2 px-4"
                                                >
                                                    Delete content
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Right Div (30% width) */}
                        <div className="col-span-4 flex items-center justify-end max-md:justify-center ">
                            <img
                                src={profileImage || "./pro.png"} // Use profileImage if available, else fallback to default
                                alt="profil"
                                className="w-60 custom-shadow rounded-full shadow-lg shadow-teal-700"
                            />
                            {localStorage.getItem("token") && (
                                <div className="ml-4">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        accept="image/svg+xml,image/png"
                                        style={{ display: "none" }}
                                        onChange={handleImageUpload}
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
                                    >
                                        {profileImage ? "Update Image" : "Upload Image"}
                                    </label>
                                    <button
                                        onClick={handleDeleteImage}
                                        className="bg-red-600 text-white py-2 px-4 rounded cursor-pointer ml-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Languages Div */}
                    <div className="max-md:py-4 max-md:languages">
                        <div className=" grid grid-cols-12 bg-white opacity-85 max-md:grid-cols-4 py-2 gap-4">
                            {filteredSkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <img
                                        className="w-14"
                                        src={"http://127.0.0.1:8000/storage/" + skill.picture}
                                        alt="lang"
                                    />
                                </div>
                            ))}
                            <Link to="/skills" className="text-blue-700">
                                See More
                            </Link>
                        </div>

                        {/* <div className="">
                          <Footer/>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
}