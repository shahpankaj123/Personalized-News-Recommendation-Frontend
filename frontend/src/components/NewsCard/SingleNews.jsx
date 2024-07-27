import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const baseImageUrl = 'http://127.0.0.1:8000';

const SingleNews = () => {
  const { postId } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/main/get-single-post/?postId=${postId}`);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching the news.');
        setLoading(false);
      }
    };

    fetchSingleNews();
  }, [postId]);

  if (loading) return <div className="text-center mt-12">Loading...</div>;
  if (error) return <div className="text-center mt-12">{error}</div>;

  return (
     <div className="flex flex-col items-center border border-gray-200 rounded-lg overflow-hidden shadow-md mt-10 mx-auto p-4 max-w-lg sm:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mb-14">
      <div className="w-full mb-6">
        <img src={`${baseImageUrl}${news.post_img}`} alt={news.title} className="w-4/5 mx-auto h-auto object-cover rounded-lg mb-6" />
        <h1 className="text-2xl sm:text-xl font-semibold mb-6  mx-6 ">{news.title}</h1>
        <p className="text-gray-600 font-semibold mb-10 mx-4">{news.description}</p>
        <div className="text-center mt-4 flex flex-col sm:flex-row justify-center">
          <span className="text-gray-600 text-sm mb-2 sm:mb-0 sm:ml-4">Category: {news.category}</span>
          <span className="text-gray-600 text-sm mb-2 sm:mb-0 sm:ml-4">Author: {news.author}</span>
          <span className="text-gray-600 text-sm mb-2 sm:mb-0 sm:ml-4">Date: {news.post_date}</span>
          <span className="text-gray-600 text-sm sm:ml-4">Time: {news.post_time}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
