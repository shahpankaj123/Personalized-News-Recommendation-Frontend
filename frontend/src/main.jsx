import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddCategory from './Dashboard/Components/AddCategory';
import AddPosts from './Dashboard/Components/AddPosts';
import AddUsers from './Dashboard/Components/AddUser';
import DashboardHome from './Dashboard/Components/DashboardHome';
import EmailValid from './components/Emailvalidate/EmailValid';
import ValidError from './components/Emailvalidate/ValidError';
import Layout from './Layout';
import ForgetPassword from './components/Forget-Password/ForgetPassword';
import OtpVerification from './components/Forget-Password/OtpVerify';
import NewPassword from './components/Forget-Password/SetNewPassword';
import About from './components/Home/About';
import Contact from './components/Home/Contact';
import Home from './components/Home/Home';
import Videos from './components/Home/Video';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import SingleNews from './components/NewsCard/SingleNews';
import './index.css';

import AddVideo from './Dashboard/Components/AddVideo';
import DashboardLayout from './Dashboard/Components/shared/Layout';
import ContactFormViewer from './Dashboard/Components/ContactView';


const App = () => {
  const [state, setState] = useState({
    categoryId: null,
    categoryName: '',
    searchQuery: '',
  });

  const handleCategorySelect = (id, name) => {
    setState((prevState) => ({ ...prevState, categoryId: id, categoryName: name, showVideos: false, searchQuery: '' }));
  };


  const handleSearch = (query) => {
    setState((prevState) => ({ ...prevState, searchQuery: query, categoryId: null, categoryName: '' }));
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout onCategorySelect={handleCategorySelect}  onSearch={handleSearch} />,
      children: [
        {
          path: '',
          element: <Home categoryId={state.categoryId} categoryName={state.categoryName} searchQuery={state.searchQuery} />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'verify-email',
          element: <EmailValid />,
        },
        {
          path: 'valid-error',
          element: <ValidError />,
        },
        {
          path: 'forget-password',
          element: <ForgetPassword />,
        },
        {
          path: 'otp-verification',
          element: <OtpVerification />,
        },
        {
          path: 'new-password',
          element: <NewPassword />,
        },
        {
          path: 'video',
          element: <Videos />,
         },
        ,{
          path: '/news/:postId',
          element: <SingleNews />,
        
        },
        {
          path: '/dashboard/*',
          element: <DashboardLayout />,
          children: [
            {
              path: '',
              element: <DashboardHome />,
            },
         
            {
              path: 'addusers',
              element: <AddUsers />,
            },
            {
              path: 'addpost',
              element: <AddPosts />,
            },
            {
              path: 'editcategory',
              element: <AddCategory />,
            },
            {
              path: 'editvideo',
              element: <AddVideo />,
            },
            {
              path: 'contact',
              element: <ContactFormViewer />,
            },
            
            
          ],
        },
      ],
    },
   
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(

    <App />

);

