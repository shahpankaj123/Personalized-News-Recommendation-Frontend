import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/Logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-12">
            <div className="mx-auto px-12 w-11/12">
                {/* Newsletter Subscription */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900">
                        Subscribe to our newsletter to get latest updated news.
                    </h3>
                    <form className="mt-4 flex flex-col sm:flex-row justify-center">
                        <input
                            type="email"
                            className="p-3 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Email Address"
                        />
                        <button className="p-3 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none bg-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Subscribe
                        </button>
                    </form>
                </div>
                <hr className="border-gray-300 my-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center lg:text-left">
                    {/* Logo and Description */}
                    <div className="flex flex-col items-center lg:items-start">
                        <Link to="/" className="flex items-center mb-4">
                            <img src={Logo} className="h-12" alt="Logo" />
                        </Link>
                        <p className="text-gray-700">
                            We create personalized news experiences for saving your time, improve user experience and respecting your priorities.
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div className='mx-auto'>
                        <h4 className="text-lg text-gray-900 font-semibold mb-4">Quick Links</h4>
                        <ul className="text-gray-700 space-y-2">
                            <li>
                                <Link to="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:underline">
                                    Who We Are?
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline">
                                    Connect Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Our Services */}
                    <div className='mx-auto'>
                        <h4 className="text-lg text-gray-900 font-semibold mb-4">Services</h4>
                        <ul className="text-gray-700 space-y-2">
                            <li>
                                <Link to="#" className="hover:underline">
                                    Latest News
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:underline">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="border-gray-300 my-8" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center">
                    <span className="text-sm text-gray-700 sm:text-left mb-4 sm:mb-0">
                        © 2024 <Link to="#" className="hover:underline">Coders United</Link>. All rights reserved.
                    </span>
                    <div className="flex justify-center sm:justify-start gap-4">
                        <a href="#" className="transition-transform transform hover:scale-110">
                            <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="30" height="30" alt="Facebook" />
                        </a>
                        <a href="#" className="transition-transform transform hover:scale-110">
                            <img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="Twitter" />
                        </a>
                        <a href="#" className="transition-transform transform hover:scale-110">
                            <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="Instagram" />
                        </a>
                        <a href="#" className="transition-transform transform hover:scale-110">
                            <img src="https://www.svgrepo.com/show/94698/github.svg" width="30" height="30" alt="GitHub" />
                        </a>
                        <a href="#" className="transition-transform transform hover:scale-110">
                            <img src="https://www.svgrepo.com/show/22037/path.svg" width="30" height="30" alt="Path" />
                        </a>
                        <a href="#" className="transition-transform transform hover:scale-110">
                            <img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="LinkedIn" />
                        </a>
                        <a href="#" className="transition-transform transform hover:scale-110">
                            <img src="https://www.svgrepo.com/show/22048/dribbble.svg" width="30" height="30" alt="Dribbble" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
