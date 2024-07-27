import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import Alert from '../../components/Alert/Alert';

export default function VideoManager() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  const fetchVideos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/vapps/', {
        headers: {
          'Authorization': `token ${token}`,
        },
      });
      setVideos(response.data);
    } catch (err) {
      setAlert({ message: 'Error fetching videos: ' + err.message, type: 'error' });
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin_panel/category/', {
        headers: {
          'Authorization': `token ${token}`,
        },
      });
      setCategories(response.data);
    } catch (err) {
      setAlert({ message: 'Error fetching categories: ' + err.message, type: 'error' });
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', videoDetails.title);
    formData.append('description', videoDetails.description);
    formData.append('category', videoDetails.category);
    if (videoFile) {
      formData.append('video', videoFile);
    }

    try {
      let response;
      if (editingVideo) {
        formData.append('id', editingVideo.id);
        response = await axios.put(
          `http://127.0.0.1:8000/api/vapps/update/`,
          formData,
          {
            headers: {
              'Authorization': `token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        response = await axios.post(
          'http://127.0.0.1:8000/api/vapps/create/',
          formData,
          {
            headers: {
              'Authorization': `token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setAlert({ message: `Video ${editingVideo ? 'updated' : 'added'} successfully!`, type: 'success' });
        const updatedVideos = editingVideo
          ? videos.map(video => (video.id === editingVideo.id ? response.data : video))
          : [...videos, response.data];
        setVideos(updatedVideos);
        setEditingVideo(null);
        setVideoDetails({ title: '', description: '', category: '' });
        setVideoFile(null);
      } else {
        setAlert({ message: 'Failed to save video.', type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Error: ' + err.message, type: 'error' });
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setVideoDetails({
      title: video.title,
      description: video.description,
      category: video.category,
    });
  };

  const handleDelete = async (video_id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/vapps/delete/`,
        {
          headers: {
            'Authorization': `token ${token}`,
          },
          data: { id: video_id },
        }
      );

      if (response.status === 200) {
        setAlert({ message: 'Video deleted successfully!', type: 'warning' });
        setVideos(videos.filter(video => video.id !== video_id));
      } else {
        setAlert({ message: 'Failed to delete video.', type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Error: ' + err.message, type: 'error' });
    }
  };

  
  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
      <h2 className="text-xl text-center font-bold mb-4">Video Manager</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={videoDetails.title}
            onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={videoDetails.description}
            onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={videoDetails.category}
            onChange={(e) => setVideoDetails({ ...videoDetails, category: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoFile">
            Video File
          </label>
          <input
            id="videoFile"
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingVideo ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faPlus} />} {editingVideo ? 'Update Video' : 'Add Video'}
          </button>
          {editingVideo && (
            <button
              type="button"
              onClick={() => {
                setEditingVideo(null);
                setVideoDetails({ title: '', description: '', category: '' });
                setVideoFile(null);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-lg font-semibold mb-4 mt-8">Videos List</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">Title</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Description</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Category</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td className="py-2 px-4 border-b border-gray-300">{video.title}</td>
              <td className="py-2 px-4 border-b border-gray-300">{video.description}</td>
              <td className="py-2 px-4 border-b border-gray-300">{getCategoryName(video.category)}</td>
              <td className="py-2 px-0 border-b border-gray-300">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 mb-1 rounded focus:outline-none focus:shadow-outline "
                  onClick={() => handleEdit(video)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700  text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(video.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
