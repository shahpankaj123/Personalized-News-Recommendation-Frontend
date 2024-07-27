import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import Alert from '../../components/Alert/Alert';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '', is_admin: false, is_staffuserss: false, is_active: false });
  const [editingUser, setEditingUser] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin_panel/users/all/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setAlert({ message: 'Error fetching users: ' + err.message, type: 'error' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const payload = { ...userDetails };
    if (editingUser && !userDetails.password) {
      delete payload.password;
    }

    try {
      if (editingUser) {
        // Update user
        const response = await axios.put(
          `http://127.0.0.1:8000/api/admin_panel/users/update/`,
          { id: editingUser.id, ...payload },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAlert({ message: 'User updated successfully!', type: 'success' });
          setEditingUser(null);
        } else {
          setAlert({ message: 'Failed to update user.', type: 'error' });
        }
      } else {
        // Add user
        const response = await axios.post(
          'http://127.0.0.1:8000/api/admin_panel/users/create/',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setAlert({ message: 'User added successfully!', type: 'success' });
          setUsers([...users, response.data]);
        } else {
          setAlert({ message: 'Failed to add user.', type: 'error' });
        }
      }

      setUserDetails({ username: '', email: '', password: '', is_admin: false, is_staffusers: false, is_active: false });
      fetchUsers();
    } catch (err) {
      setAlert({ message: err.message + ', email may already exist!' , type: 'error' });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserDetails({ username: user.username, email: user.email, password: '', is_admin: user.is_admin, is_staffusers: user.is_staffusers, is_active: user.is_active });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin_panel/users/delete/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
          },
          data: { id },
        }
      );

      if (response.status === 204) {
        setAlert({ message: 'User deleted successfully!', type: 'warning' });
        fetchUsers();
      } else {
        setAlert({ message: 'Failed to delete user.', type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Error: ' + err.message, type: 'error' });
    }
  };

 

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
      <h2 className="text-xl text-center font-bold mb-4">User Manager</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={userDetails.username}
            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Roles</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={userDetails.is_admin}
                onChange={(e) => setUserDetails({ ...userDetails, is_admin: e.target.checked })}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Admin</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={userDetails.is_staffusers}
                onChange={(e) => setUserDetails({ ...userDetails, is_staffusers: e.target.checked })}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Staff</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={userDetails.is_active}
                onChange={(e) => setUserDetails({ ...userDetails, is_active: e.target.checked })}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingUser ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faPlus} />} {editingUser ? 'Update User' : 'Add User'}
          </button>
          {editingUser && (
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setEditingUser(null);
                setUserDetails({ username: '', email: '', password: '', is_admin: false, is_staffusers: false, is_active: false });
              }}
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-xl text-center font-bold mb-4">User List</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Username</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Admin</th>
              <th className="py-2 px-4 border-b border-gray-200">Staff</th>
              <th className="py-2 px-4 border-b border-gray-200">Active</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.is_admin ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.is_staffusers ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.is_active ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
