import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrendingNewsCard = ({ id, title, urlToImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="flex items-center mb-6 p-4 border border-gray-200 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer" onClick={handleClick}>
      <img className="w-16 h-16 object-cover rounded-lg" src={urlToImage} alt={title} />
      <div className="ml-3">
        <span className="text-sm font-semibold text-blue-400 hover:text-blue-800">{title}</span>
      </div>
    </div>
  );
};

export default TrendingNewsCard;
