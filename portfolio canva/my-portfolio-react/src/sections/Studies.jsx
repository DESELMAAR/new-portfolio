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
        "Professional  Bachelor's degree  in Computer Engineering and digitalization.",
    },
    {
      id: 2,
      degree: "Technician Diploma",
      institution: "ISTA Kenitra",
      field: "Computer network technician Specialized",
      // duration: "2016 - 2018",
      description:
        "Computer network administration, Design of switched local area networks, Supervision of computer networks,...",
    },
  ];

  const [videoUrl, setVideoUrl] = useState("");

  // Fetch the video URL from your Laravel backend
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/videos/5/play"); // Replace `1` with the actual video ID
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

  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1">
      <div
        className="mt-28 m-4 p-6 rounded-lg shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.3)", // Semi-transparent white background
          backdropFilter: "blur(10px)", // Blur effect for the glassy look
          border: "1px solid rgba(255, 255, 255, 0.2)", // Light border for depth
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
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
      <div className=" mt-28 m-4">
        {videoUrl ? (
          // <video controls className="w-full h-auto">
          //   <source src={videoUrl} type="video/mp4" />
          //   Your browser does not support the video tag.
          // </video>
          <VideoPlayer videoUrl={videoUrl} />
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default Studies;
