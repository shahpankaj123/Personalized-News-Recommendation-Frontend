import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert'; 

const EmailValidationFailurePage = () => {
    const navigate = useNavigate();

    const redirectToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Alert message="Oops! could not validate your email." type="error" />
            <p className="text-red-800 font-bold mb-4">Contact admin@babalnews.com for any support.</p>
            <button
                onClick={redirectToSignup}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
                Go to Signup Page
            </button>
        </div>
    );
};

export default EmailValidationFailurePage;
