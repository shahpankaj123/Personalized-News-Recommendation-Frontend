import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert'; 


const EmailValid = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Alert message="Email Validation Successful" type="success" />
            <button
                onClick={redirectToLogin}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Proceed to Login
            </button>
        </div>
    );
};

export default EmailValid;
