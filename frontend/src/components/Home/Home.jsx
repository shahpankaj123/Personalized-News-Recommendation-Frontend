import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecommendedNewsCard from '../NewsCard/RecommendedNewsCard';
import TrendingNews from './Trending';
import Alert from '../Alert/Alert';
const HomePage = ({ categoryId, categoryName }) => {
 
  const [recommendedNews, setRecommendedNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(21);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showAlert, setShowAlert] = useState(!isLoggedIn);
  const [mediumScreen, setMediumScreen] = useState(window.innerWidth >= 768);
  const [title, setTitle] = useState('Recommended News');

  
 
  useEffect(() => {
    fetchNews();
    handleResize();
    window.addEventListener('resize', handleResize);
   
    return () => {
      window.removeEventListener('resize', handleResize);
 
    };
  }, [categoryId, isLoggedIn]);

  useEffect(() => {
    if (categoryId) {
      setTitle(` ${categoryName || ''} News`);
    } else if (searchQuery) {
      setTitle(`Search Results for "${searchQuery}"`);
    } else if (isLoggedIn) {
      setTitle('Recommended News');
    } else {
      setTitle('Random News');
    }
  }, [categoryId, searchQuery, isLoggedIn]);

  const fetchNews = async (query = '', page = 1) => {
    try {
      const response = query
        ? await axios.get(`http://127.0.0.1:8000/api/main/search-post?search=${query}`)
        : await axios.get(
            categoryId
              ? `http://127.0.0.1:8000/api/main/get-categorywise-post?categoryId=${categoryId}`
              : isLoggedIn
              ? 'http://127.0.0.1:8000/api/main/get-random-post/'
              : 'http://127.0.0.1:8000/api/main/get-random-post'
          );  
      const newsData = response.data.articles || response.data;
         setRecommendedNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1280) {
      setNewsPerPage(20);
      setMediumScreen(false);
    } else if (width >= 1024) {
      setNewsPerPage(15);
      setMediumScreen(true);
    } else {
      setNewsPerPage(10);
      setMediumScreen(true);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    await fetchNews(searchQuery, 1);
  };

  const handleLogout = (event) => {
    if (event.key === 'token' && !localStorage.getItem('token')) {
      setIsLoggedIn(false);
      setShowAlert(true);
      fetchNews();
    }
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentRecommendedNews = recommendedNews.slice(indexOfFirstNews, indexOfLastNews);
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNews(searchQuery, pageNumber);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const baseImageUrl = 'http://127.0.0.1:8000';

  return (
    <div className="container mx-auto px-12 py-8">
      {showAlert && (
        <div className="alert-container">
          <Alert message="Login to get the personalized news experience" type="info" onClose={handleCloseAlert} />
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="w-full lg:w-3/5 lg:pr-6 mb-8 lg:mb-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
            <h2 className="text-2xl font-bold mb-8 lg:mb-8">{title}</h2>
            {mediumScreen && (
              <div className="flex items-center mb-6">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full lg:w-4/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-0 lg:mt-0 lg:ml-2 hover:bg-blue-700 shadow-sm flex items-center justify-center transition transform hover:scale-105 lg:w-1/5"
                >
                  <svg
                    className="h-5 w-5 mr-2 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 56.966 56.966"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                  </svg>
                  Search
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {currentRecommendedNews.map((news) => (
              <RecommendedNewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                description={news.description}
                urlToImage={`${baseImageUrl}${news.post_img}` || 'https://via.placeholder.com/150'}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Previous
              </button>
            )}
            {indexOfLastNews < recommendedNews.length && (
              <button onClick={() => paginate(currentPage + 1)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                Next
              </button>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3 lg:pl-4">
          <div className="flex flex-col">
            <div className="mb-4">
              {!mediumScreen && (
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full lg:w-3/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 lg:mt-0 lg:ml-2 hover:bg-blue-700 shadow-sm flex items-center justify-center transition transform hover:scale-105 w-full lg:w-1/4"
                  >
                    <svg
                      className="h-5 w-5 mr-2 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 56.966 56.966"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                    </svg>
                    Search
                  </button>
                </div>
              )}
            </div>
            <TrendingNews />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


