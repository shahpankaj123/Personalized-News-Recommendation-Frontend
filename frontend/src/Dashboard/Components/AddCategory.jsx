import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import Alert from '../../components/Alert/Alert';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin_panel/category/', {
        headers: {
          'Content-Type': 'application/json',
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

    try {
      if (editingCategory) {
        // Update category
        const response = await axios.put(
          'http://127.0.0.1:8000/api/admin_panel/category/update/',
          { id: editingCategory.id, name: categoryName },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAlert({ message: 'Category updated successfully!', type: 'success' });
          setEditingCategory(null);
        } else {
          setAlert({ message: 'Failed to update category.', type: 'error' });
        }
      } else {
        // Add category
        const response = await axios.post(
          'http://127.0.0.1:8000/api/admin_panel/category/create/',
          { name: categoryName },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setAlert({ message: 'Category added successfully!', type: 'success' });
          setCategories([...categories, response.data]);
        } else {
          setAlert({ message: 'Failed to add category.', type: 'error' });
        }
      }

      setCategoryName('');
      fetchCategories();
    } catch (err) {
      setAlert({ message: 'Error: ' + err.message, type: 'error' });
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin_panel/category/delete/?id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
          },
          data: { id },
        }
      );

      if (response.status === 204) {
        setAlert({ message: 'Category deleted successfully!', type: 'warning' });
        fetchCategories();
      } else {
        setAlert({ message: 'Failed to delete category.', type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Error: ' + err.message, type: 'error' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
      <h2 className="text-xl text-center font-bold mb-4">Category Manager</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingCategory ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faPlus} />} {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
          {editingCategory && (
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setEditingCategory(null);
                setCategoryName('');
              }}
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-lg font-semibold mb-4 mt-8">Categories List</h3>
      <ul className="list-disc list-inside">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between mb-2">
            {category.name}
            <div className="flex items-center">
            <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleEdit(category)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(category.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
