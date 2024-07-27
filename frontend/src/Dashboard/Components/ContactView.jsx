import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactFormViewer() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin_panel/contact/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `token ${token}`,
        },
      });
      setContacts(response.data);
    } catch (err) {
      setAlert({ message: 'Error fetching contacts: ' + err.message, type: 'error' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      <h2 className="text-xl text-center font-bold mb-4">Contact Form Submissions</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-center">
            <th className="py-2 px-auto border-b-2 border-gray-300">Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Phone</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Message</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{contact.vname}</td>
              <td className="py-2 px-4 border-b">{contact.vphone}</td>
              <td className="py-2 px-4 border-b">{contact.vmessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
