import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

const Studies = () => {
  const studies = [
    {
      id: 1,
      degree: "Bachelor's Degree",
      institution: "ENSA Kenitra",
      field: "Computer Science",
      duration: "2023 - 2024",
      description:
        "Professional Bachelor's degree in Computer Engineering and digitalization.",
    },
    {
      id: 2,
      degree: "Technician Diploma",
      institution: "ISTA Kenitra",
      field: "Computer network technician Specialized",
      description:
        "Computer network administration, Design of switched local area networks, Supervision of computer networks,...",
    },
  ];

  const [videoUrl, setVideoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch the video URL from your Laravel backend
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/videos/5/play"); // Replace `5` with the actual video ID
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
        } else {
          console.error("Failed to fetch video");
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", selectedFile.name); // Use the file name as the title
    formData.append("video", selectedFile);

    setUploading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/videos/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
        
      });

      if (response.ok) {
        const result = await response.json();
        alert("Video uploaded successfully!");
        console.log("Uploaded Video:", result.video);
      } else {
        console.error("Failed to upload video");
        alert("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1">
      <div
        className="mt-28 m-4 p-6 rounded-lg shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-2xl font-bold text-gray-200 mb-1">Education</h2>
        <div className="space-y-6">
          {studies.map((study) => (
            <div key={study.id} className="border-l-4 border-green-600 pl-4">
              <h3 className="text-lg font-bold text-gray-100">
                {study.degree}
              </h3>
              <p className="text-gray-300">{study.institution}</p>
              <p className="text-gray-100 text-sm">{study.field}</p>
              <p className="text-gray-100 text-sm">{study.duration}</p>
              <p className="text-gray-0 mt-2">{study.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-28 m-4">
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} />
        ) : (
          <p>Loading video...</p>
        )}

        <div className="mt-4">
          <input
            type="file"
            accept="video/mp4,video/quicktime"
            onChange={handleFileChange}
            className="mb-2"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {uploading ? "Uploading..." : "Upload new Video"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Studies;