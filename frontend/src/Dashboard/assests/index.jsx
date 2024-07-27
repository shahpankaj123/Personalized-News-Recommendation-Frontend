import {
	HiOutlineViewGrid,
	HiOutlineUserAdd,
	HiCloudUpload,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiPhone,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'DashboardHome',
		path: '/dashboard',
		icon: <HiOutlineViewGrid />
	},

	{
		key: 'Addusers',
		label: 'Users',
		path: '/dashboard/addusers',
		icon:  <HiOutlineUserAdd />
	},
	{
		key: 'AddCategory',
		label: 'Add Category',
		path: '/dashboard/editcategory',
		icon:  <HiOutlineDocumentText />
	},
	{
		key: 'Addpost',
		label: 'Add post',
		path: '/dashboard/addposts',
		icon: <HiCloudUpload />
	},
	{
		key: 'Add Videor',
		label: 'Videos	',
		path: '/dashboard/editvideo',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'View Contact',
		label: 'Contact View	',
		path: '/dashboard/contact',
		icon: <HiOutlineDocumentText />
	},
	
	{
		key: 'logout',
		label: 'Logout',
		path: '/dashboard/logout',
		icon: <HiOutlineAnnotation />

	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [

]
