import React, { useRef } from 'react';

const VideoCard = ({ title, videoUrl, description }) => {
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="flex flex-col justify-center border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl mb-14 p-4 bg-gray-100 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-start ml-2 mt-0 mb-4">{title}</h3>
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        src={videoUrl}
        style={{ aspectRatio: '1.66 / 1' }}
        autoPlay={false}
        loop
        onMouseEnter={(e) => e.currentTarget.play()}
        onMouseLeave={(e) => e.currentTarget.pause()}
        controls
      />
      <p className="text-gray-600 text-justify mt-12">{description}</p>
    </div>
  );
};

export default VideoCard;
