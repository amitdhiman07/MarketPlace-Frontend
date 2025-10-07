import { useState } from 'react';
import '../signIn/signin.css';
import * as React from "react";

interface RegisterProps {
    onClose: () => void;
}

function Register({ onClose }: RegisterProps) {
    const [isMobileRegister, setIsMobileRegister] = useState(false);
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleToggleChange = () => {
        setIsMobileRegister(!isMobileRegister);
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out" onClick={handleOverlayClick}>
            <div className="modal-content bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 ease-in-out scale-95 animate-[fadeIn_0.5s_ease-in-out] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title text-2xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-orange-500 to-amber-600 text-transparent bg-clip-text">
                    Register
                </h2>
                <div className="sign-in-form flex flex-col gap-4">
                    <div className="form-group toggle-group" style={{ '--form-group-index': 0 } as React.CSSProperties}>
                        <label className="toggle-label flex items-center gap-2 cursor-pointer">
                            <span className="text-gray-700 font-medium">Use Mobile Register</span>
                            <input
                                type="checkbox"
                                checked={isMobileRegister}
                                onChange={handleToggleChange}
                                className="toggle-input"
                            />
                            <span className="toggle-slider relative inline-block w-12 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out">
                                <span className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out ${isMobileRegister ? 'translate-x-6 bg-amber-500' : ''}`}></span>
                            </span>
                        </label>
                    </div>
                    <div className="form-group" style={{ '--form-group-index': 1 } as React.CSSProperties}>
                        <label htmlFor="name" className="text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter full name"
                            className="search-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
                            required
                        />
                    </div>
                    {isMobileRegister ? (
                        <div className="form-group" style={{ '--form-group-index': 2 } as React.CSSProperties}>
                            <label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter phone number"
                                className="search-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
                                required
                            />
                        </div>
                    ) : (
                        <div className="form-group" style={{ '--form-group-index': 2 } as React.CSSProperties}>
                            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                className="search-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
                                required
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="search-button modal-sign-in-button w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 active:bg-amber-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-amber-500"
                    >
                        {isMobileRegister ? 'Send OTP' : 'Register'}
                    </button>
                </div>
                <button
                    className="cta-button close-button mt-4 w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-red-500"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Register;