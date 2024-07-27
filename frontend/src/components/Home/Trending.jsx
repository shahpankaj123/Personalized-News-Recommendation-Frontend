import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrendingNewsCard from '../NewsCard/TrendingNewsCard';

const baseImageUrl = 'http://127.0.0.1:8000';

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);

  const fetchTrendingNews = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/main/get-latest-post');
      setTrendingNews(response.data);
    } catch (error) {
      console.error('Error fetching trending news:', error);
    }
  };

  useEffect(() => {
    fetchTrendingNews();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Trending News</h2>
      <div className="grid grid-cols-1 ">
        {trendingNews.map((news) => (
          <TrendingNewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            urlToImage={`${baseImageUrl}${news.post_img}` || 'https://via.placeholder.com/150'}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
