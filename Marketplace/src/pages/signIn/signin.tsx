import { useState } from 'react';
import './SignIn.css';
import * as React from "react";

interface SignInProps {
    onClose: () => void;
}

function SignIn({ onClose }: SignInProps) {
    const [isMobileLogin, setIsMobileLogin] = useState(false);
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleToggleChange = () => {
        setIsMobileLogin(!isMobileLogin);
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2 className="modal-title">Sign In</h2>
                <form className="sign-in-form">
                    <div className="form-group toggle-group" style={{ '--form-group-index': 0 } as React.CSSProperties}>
                        <label className="toggle-label">
                            <span>Use Mobile Login</span>
                            <input
                                type="checkbox"
                                checked={isMobileLogin}
                                onChange={handleToggleChange}
                                className="toggle-input"
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    {isMobileLogin ? (
                        <div className="form-group" style={{ '--form-group-index': 1 } as React.CSSProperties}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter phone number"
                                className="search-input"
                                required
                            />
                        </div>
                    ) : (
                        <>
                            <div className="form-group" style={{ '--form-group-index': 1 } as React.CSSProperties}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="search-input"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ '--form-group-index': 2 } as React.CSSProperties}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="search-input"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className="search-button modal-sign-in-button">
                        {isMobileLogin ? 'Send OTP' : 'Sign In'}
                    </button>
                </form>
                <button className="cta-button sign-in close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default SignIn;