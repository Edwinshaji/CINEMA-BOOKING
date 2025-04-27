import React, { useState } from 'react';
import './ChangePassword.css';
import { toast } from 'react-toastify';

const ChangePassword = ({ onClose, onSave }) => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newConfirmPassword , setNewConfirmPassword] = useState();

    const handleSave = () => {
        if(newPassword === newConfirmPassword){
            onSave(oldPassword,newPassword);
            onClose()
        }else{
            toast.error("New password doesn't matches");
        }
        
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>

                <h2>Change Password</h2>

                <input
                    type="password"
                    className="old-pass-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder='Enter the Old Password'
                />

                <input
                    type="password"
                    className="new-pass-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Enter the New Password'
                />
                <input
                    type="password"
                    className="new-confirmpass-input"
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    placeholder='Re-Enter the New Password'
                />

                <button className="save-btn" onClick={handleSave}>
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;
