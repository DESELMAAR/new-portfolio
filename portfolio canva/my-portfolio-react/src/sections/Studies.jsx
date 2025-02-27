import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

const Studies = () => {
  const studies = [
    {
      id: 1,
      degree: "Bachelor's Degree",
      institution: "ENSA Kenitra",
      field: "Computer Science",
      duration: "2018 - 2021",
      description:
        "Studied advanced topics in software engineering, algorithms, and data structures.",
    },
    {
      id: 2,
      degree: "Technician Diploma",
      institution: "ISTA Kenitra",
      field: "Software Development",
      duration: "2016 - 2018",
      description:
        "Gained hands-on experience in programming, web development, and database management.",
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
    <div className="grid grid-cols-2">
      <div className="mt-28 m-4 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
        <div className="space-y-6">
          {studies.map((study) => (
            <div key={study.id} className="border-l-4 border-green-600 pl-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {study.degree}
              </h3>
              <p className="text-gray-600">{study.institution}</p>
              <p className="text-gray-500 text-sm">{study.field}</p>
              <p className="text-gray-500 text-sm">{study.duration}</p>
              <p className="text-gray-600 mt-2">{study.description}</p>
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
          <VideoPlayer videoUrl={videoUrl}/>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default Studies;