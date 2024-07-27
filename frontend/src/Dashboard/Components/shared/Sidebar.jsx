import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout, HiOutlineUsers, HiOutlineUserAdd, HiOutlineMail, HiOutlineFolder, HiOutlineNewspaper, HiOutlineVideoCamera } from 'react-icons/hi';
import { handleLogout } from '../../../components/Login/Logout';

const LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <FcBullish />,
  },
  {
    key: 'users',
    label: 'Users',
    path: '/dashboard/addusers',
    icon: <HiOutlineUsers />,
  },
  {
    key: 'addCategory',
    label: 'Category',
    path: '/dashboard/editcategory',
    icon: <HiOutlineFolder />,
  },
  {
    key: 'addPost',
    label: 'Posts',
    path: '/dashboard/addpost',
    icon: <HiOutlineNewspaper />,
  },
  {
    key: 'addVideo',
    label: 'Videos',
    path: '/dashboard/editvideo',
    icon: <HiOutlineVideoCamera />,
  },
  {
    key: 'viewContact',
    label: 'Contact Form',
    path: '/dashboard/contact',
    icon: <HiOutlineMail />,
  },
  {
    key: 'logout',
    label: 'Logout',
    path: '/dashboard/logout',
    icon: <HiOutlineLogout />,
  },
];


export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    const result = await handleLogout({
      onLogout: () => navigate('/')
    });
    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="bg-indigo-950 w-60 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-200 text-lg">AdminPanel</span>
      </div>
      <nav className="py-8 flex flex-1 flex-col gap-2">
        {LINKS.map((link) => (
          link.key === 'logout' ? (
            <button
              key={link.key}
              onClick={handleLogoutClick}
              className={`flex items-center gap-2 px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm ${
                pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </button>
          ) : (
            <SidebarLink key={link.key} link={link} pathname={pathname} />
          )
        ))}
      </nav>
    </div>
  );
}

function SidebarLink({ link, pathname }) {
  const isActive = pathname === link.path;

  return (
    <Link
      to={link.path}
      className={`flex items-center gap-2 px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm ${
        isActive ? 'bg-neutral-700 text-white' : 'text-neutral-400'
      }`}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
