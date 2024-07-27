import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendedNewsCard = ({ id, title, description, urlToImage }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/news/${id}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '......';
  };

  return (
    <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl mb-4 hover:glow p-4 cursor-pointer" onClick={handleClick}>
      <div className="w-1/3">
        <img className="object-cover w-full h-full rounded-lg" src={urlToImage} alt={title} style={{ aspectRatio: '16 / 9' }} />
      </div>
      <div className="pl-4 flex flex-col justify-between w-2/3">
        <div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{truncateText(description, 120)}</p>
        </div>
        <button onClick={handleClick} className="text-blue-500 hover:text-blue-700 text-left" >
          Read more
        </button>
      </div>
    </div>
  );
};

export default RecommendedNewsCard;
