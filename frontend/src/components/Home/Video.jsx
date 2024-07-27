import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../NewsCard/VideoCard';

const baseUrl = 'http://127.0.0.1:8000';
const Videos = () => {
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/vapps/');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-12 ml-8">Videos</h2>
      <div className="grid grid-cols-1 gap-6 ">
        {videos.map((video) => (
          <VideoCard 
            key={video.id} 
            title={video.title} 
            videoUrl={`${baseUrl}${video.video}`} 
            description={video.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Videos;
