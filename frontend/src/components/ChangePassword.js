import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {

    const userId = localStorage.getItem('userId')
    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New password do not match ");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/change_password/${userId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                })
            });

            const data = await response.json();
            if (response.status === 200) {
                toast.success(data.message);
                setFormData({oldPassword:'', newPassword: '', confirmPassword: ''})
            }
            else {
                toast.error(data.message);
            }


        }
        catch (error) {
            console.error('Error: ', error)
            toast.error('Something went wrong, Try again.')
        }
    };

    return (
        <div className='container mt-5'>
            <div className='text-center mb-4'>
                <h1><i className='fas fa-key me-2'></i>  Change Password</h1>
                <p className='text-muted'>Secure your account with a new password.</p>
            </div>

            <form className='p-4 rounded shadow mx-auto' style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-lable'>Old Password</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-lock'></i>
                        </span>
                        <input type='password' name='oldPassword' value={formData.oldPassword} className='form-control' onChange={handleChange} placeholder='Enter old password' required />
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='form-lable'>New Password</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-lock-open'></i>
                        </span>
                        <input type='password' name='newPassword' className='form-control' value={formData.newPassword} onChange={handleChange} placeholder='Enter new password' required />
                    </div>
                </div>
                <div className=''>
                    <label className='form-lable'>Confirm Password</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-lock-open'></i>
                        </span>
                        <input type='password' name='confirmPassword' value={formData.confirmPassword} className='form-control' onChange={handleChange} placeholder='Confirm your new password' required />
                    </div>
                </div>

                <button type='submit' className='btn btn-primary w-100 mt-3'><i className='fas fa-key me-1'></i> Change Password</button>

            </form>

            <ToastContainer />
        </div>
    )
}

export default ChangePassword