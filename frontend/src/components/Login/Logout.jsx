import axios from 'axios';
import Alert from '../Alert/Alert';

export const handleLogout = async ({ onLogout }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { error: 'Token not found. Please log in again.' };
        }

        const response = await axios.post(
            'http://127.0.0.1:8000/api/account/user/logout',
            {},
            {
                headers: {
                    Authorization: `token ${token}`
                },
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            window.dispatchEvent(new Event('loginStateChanged'));
            onLogout();
            return { success: 'Logout successful' };
            
        
        }
    } catch (error) {
        console.error('Logout failed', error);
        return { error: 'Logout failed. Please try again.' };
    }
};
