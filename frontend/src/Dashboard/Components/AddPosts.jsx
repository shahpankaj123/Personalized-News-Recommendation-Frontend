import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import Alert from '../../components/Alert/Alert';

export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [postDetails, setPostDetails] = useState({ title: '', description: '', category_id: '' });
  const [image, setImage] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin_panel/ListPosts/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `token ${token}`,
        },
      });
      setPosts(response.data);
    } catch (err) {
      setAlert({ message: 'Error fetching posts: ' + err.message, type: 'error' });
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin_panel/category/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `token ${token}`,
        },
      });
      setCategories(response.data);
    } catch (err) {
      setAlert({ message: 'Error fetching categories: ' + err.message, type: 'error' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');

    const formData = new FormData();
    formData.append('title', postDetails.title);
    formData.append('description', postDetails.description);
    formData.append('category', postDetails.category_id);
    formData.append('author', user_id);
    if (image) {
      formData.append('post_img', image);
    }

   
    try {
      let response;
      if (editingPost) {
        // Update post
        formData.append('id', editingPost.id); 
        response = await axios.put(
          `http://127.0.0.1:8000/api/admin_panel/posts/update/`,
          formData,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          setAlert({ message: 'Post updated successfully!', type: 'success' });
          setEditingPost(null);
        } else {
          setAlert({ message: 'Failed to update post.', type: 'error' });
        }
      } else {
        // Create new post
        response = await axios.post(
          'http://127.0.0.1:8000/api/admin_panel/posts/create/',
          formData,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 201) {
          setAlert({ message: 'Post created successfully!', type: 'success' });
          setPosts([...posts, response.data]);
        } else {
          setAlert({ message: 'Failed to create post.', type: 'error' });
        }
      }

      // Reset form
      setPostDetails({ title: '', description: '', category_id: '' });
      setImage(null);
      fetchPosts();
    } catch (err) {
      setAlert({ message: 'Error: ' + err.message, type: 'error' });
    }
  };

  const handleEdit = (post) => {
    
    const category = categories.find(cat => cat.name === post.category);
    const category_id = category ? category.id : '';
    setEditingPost(post);
    setPostDetails({ title: post.title, description: post.description, category_id });
  };


  const handleDelete = async (post_id) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin_panel/posts/delete/`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `token ${token}`,
          },
          params: {
            id: post_id,
          },
        }
      );

      if (response.status === 204) {
        setAlert({ message: 'Post deleted successfully!', type: 'warning' });
        fetchPosts();
      } else {
        setAlert({ message: 'Failed to delete post.', type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Error: ' + err.message, type: 'error' });
    }
  };


 

  return (
    <>
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
        {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
        <h2 className="text-xl text-center font-bold mb-4">Post Manager</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={postDetails.title}
              onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })}
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
              value={postDetails.description}
              onChange={(e) => setPostDetails({ ...postDetails, description: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
              Category
            </label>
            <select
              id="category_id"
              value={ postDetails.category_id}
              onChange={(e) => setPostDetails({ ...postDetails, category_id: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editingPost ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faPlus} />} {editingPost ? 'Update' : 'Add'} Post
            </button>
            {editingPost && (
              <button
                type="button"
                onClick={() => {
                  setEditingPost(null);
                  setPostDetails({ title: '', description: '', category_id: '' });
                  setImage(null);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            )}
          </div>
        </form>

        <h3 className="text-lg font-bold my-4">Posts</h3>
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
            {posts.map(post => (
              <tr key={post.id}>
                <td className="py-2 px-4 border-b">{post.title}</td>
                <td className="py-2 px-4 border-b">{post.description}</td>
                <td className="py-2 px-4 border-b">{post.category}</td>
                <td className="py-2 px-0 border-b border-gray-300">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 mb-1 rounded focus:outline-none focus:shadow-outline "
                  onClick={() => handleEdit(post)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700  text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(post.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
