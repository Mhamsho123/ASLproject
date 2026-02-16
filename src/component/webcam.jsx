import React, { useRef, useEffect } from 'react';

const WebcamStreamer = () => {
  const videoRef = useRef(null);

  const getCameraFeed = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        // Assign the stream to the video element
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      // Handle potential errors, e.g., user denied permission or no camera found
      console.error("Error accessing camera: ", err);
      alert("Could not access the camera. Please check your browser/system permissions.");
    }
  };

  useEffect(() => {
    getCameraFeed();

    // Optional: Cleanup function to stop the stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {/* The video element with the 'ref' and 'autoPlay' attribute */}
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default WebcamStreamer;
