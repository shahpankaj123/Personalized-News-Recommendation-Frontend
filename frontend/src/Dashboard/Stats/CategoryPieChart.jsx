import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#A28EEC', '#FF6584', '#26B6B1', '#FCAB10',
  '#8DD1E1', '#83A6ED', '#8884D8', '#82CA9D',
  '#FF4C4C', '#AAFF00', '#9900CC', '#33CC33', 
  '#FF9999', '#6600FF', '#0099CC', '#FFCC00',
  '#FF3300', '#3366CC', '#9933CC', '#33CCCC',
  '#66CC99', '#FF6699', '#CCFF66', '#6666FF'
];

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin_panel/pie-chart-count/', {
          headers: {
            'Authorization': `token ${token}`,
          },
        });
        const formattedData = response.data.map((item) => {
          const [key, value] = Object.entries(item)[0];
          return { name: key.replace('-count', ''), value };
        });
        setData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ResponsiveContainer width="100%" height={400} >
		<div className="bg-gray-100 p-2 rounded-lg shadow-lg m-auto  mt-0 mb-0">
		<h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Category-wise News Stats</h2>
		</div>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

    </ResponsiveContainer>
  );
};

export default PieChartComponent;
