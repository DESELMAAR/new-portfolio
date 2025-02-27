import React, { useRef, useState } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Volume state (0 to 1)
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Update current time as the video plays
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Set video duration when metadata is loaded
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  // Handle seek (scrubbing through the video)
  const handleSeek = (e) => {
    const seekTime = e.target.value;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="video-player-container max-w-3xl mx-auto">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-auto rounded-lg shadow-lg"
      >
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}
      <div className="custom-controls bg-black bg-opacity-75 p-3 rounded-b-lg flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button onClick={togglePlayPause} className="text-white">
          {isPlaying ? (
            <span role="img" aria-label="Pause">
              ⏸️
            </span>
          ) : (
            <span role="img" aria-label="Play">
              ▶️
            </span>
          )}
        </button>

        {/* Seek Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1"
        />

        {/* Time Display */}
        <span className="text-white">
          {Math.floor(currentTime)} / {Math.floor(duration)}s
        </span>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Volume">
            🔈
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>

        {/* Fullscreen Button */}
        <button onClick={toggleFullscreen} className="text-white">
          {isFullscreen ? (
            <span role="img" aria-label="Exit Fullscreen">
              ⬜
            </span>
          ) : (
            <span role="img" aria-label="Fullscreen">
              ⛶
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

// import { useRef, useState } from "react";
// import { Play, Pause } from "lucide-react"; // Icon library

// const VideoPlayer = ({ videoUrl }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlay = () => {
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//     } else {
//       videoRef.current.pause();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="relative w-full max-w-2xl mx-auto">
//       <video
//         ref={videoRef}
//         className="w-full h-auto rounded-lg shadow-lg border border-gray-300 bg-black"
//         onPlay={() => setIsPlaying(true)}
//         onPause={() => setIsPlaying(false)}
//       >
//         <source src={videoUrl} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Play/Pause Button Overlay */}
//       <button
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-4 rounded-full shadow-md"
//         onClick={togglePlay}
//       >
//         {isPlaying ? <Pause className="w-8 h-8 text-black" /> : <Play className="w-8 h-8 text-black" />}
//       </button>
//     </div>
//   );
// };

// export default VideoPlayer;
