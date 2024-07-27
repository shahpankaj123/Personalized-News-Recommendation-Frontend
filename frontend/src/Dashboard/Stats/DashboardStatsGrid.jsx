import React, { useState, useEffect } from 'react';
import { IoPeople, IoFileTrayStackedOutline } from 'react-icons/io5';
import { GrUserAdmin } from "react-icons/gr";
import { TiUploadOutline } from "react-icons/ti";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import axios from 'axios';

export default function DashboardStatsGrid() {
  const [stats, setStats] = useState({
    totalCategory: 0,
    admins: 0,
    totalUsers: 0,
    totalPosts: 0,
    totalStaff: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const [categoriesResponse, adminsResponse, usersResponse, postsResponse, staffResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/admin_panel/count/category', {
            headers: { 'Authorization': `token ${token}` }
          }),
          axios.get('http://127.0.0.1:8000/api/admin_panel/count/admin', {
            headers: { 'Authorization': `token ${token}` }
          }),
          axios.get('http://127.0.0.1:8000/api/admin_panel/count/user', {
            headers: { 'Authorization': `token ${token}` }
          }),
          axios.get('http://127.0.0.1:8000/api/admin_panel/count/post', {
            headers: { 'Authorization': `token ${token}` }
          }),
          axios.get('http://127.0.0.1:8000/api/admin_panel/count/staff', {
            headers: { 'Authorization': `token ${token}` }
          }),
        ]);

        setStats({
          totalCategory: categoriesResponse.data.count,
          admins: adminsResponse.data.count,
          totalUsers: usersResponse.data.count,
          totalPosts: postsResponse.data.count,
          totalStaff: staffResponse.data.count,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-14 mx-4 p-4">
      <BoxWrapper>
        <StatBox
          icon={<IoFileTrayStackedOutline className="text-4xl text-white" />}
          label="Total Category"
          value={stats.totalCategory}
          bgColor="bg-sky-500"
        />
      </BoxWrapper>
      <BoxWrapper>
        <StatBox
          icon={<TiUploadOutline className="text-4xl text-white" />}
          label="Total Posts"
          value={stats.totalPosts}
          bgColor="bg-green-600"
        />
      </BoxWrapper>
      <BoxWrapper>
        <StatBox
          icon={<GrUserAdmin className="text-4xl text-white" />}
          label="Admins"
          value={stats.admins}
          bgColor="bg-orange-600"
        />
      </BoxWrapper>
      <BoxWrapper>
        <StatBox
          icon={<IoPeople className="text-4xl text-white" />}
          label="Normal Users"
          value={stats.totalUsers}
          bgColor="bg-yellow-400"
        />
      </BoxWrapper>
      <BoxWrapper>
        <StatBox
          icon={<MdOutlineSupervisorAccount className="text-4xl text-white" />}
          label="Total Staff"
          value={stats.totalStaff}
          bgColor="bg-purple-500"
        />
      </BoxWrapper>
    </div>
  );
}

function StatBox({ icon, label, value, bgColor }) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`rounded-full h-16 w-16 flex items-center justify-center ${bgColor}`}>
        {icon}
      </div>
      <div>
        <span className="text-sm text-gray-500 font-semibold">{label}</span>
        <div className="flex items-center">
          <strong className="text-4xl text-gray-700 font-semibold">{value}</strong>
        </div>
      </div>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 flex flex-col justify-center items-center w-full h-40"> {/* Fixed height */}
      {children}
    </div>
  );
}
