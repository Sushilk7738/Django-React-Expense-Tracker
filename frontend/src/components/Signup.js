import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
    return (
        <div className='container mt-5'>
            <div className='text-center mb-4'>
                <h1><i className='fas fa-user-plus me-2'></i>  Signup</h1>
                <p className='text-muted'>Create your account to start tracking expenses</p>
            </div>

            <form className='p-4 rounded shadow mx-auto' style={{maxWidth:"400px"}}>
                <div className='mb-3'>
                    <label className='form-lable'>Full Name</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-user'></i>
                        </span>
                        <input type='text' name='FullName' className='form-control' placeholder='Enter your name' required/>
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='form-lable'>Email</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-envelope'></i>
                        </span>
                        <input type='email' name='Email' className='form-control' placeholder='Enter your email' required/>
                    </div>
                </div>
                <div className=''>
                    <label className='form-lable'>Password</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-lock'></i>
                        </span>
                        <input type='password' name='Password' className='form-control' placeholder='Create your password' required/>
                    </div>
                </div>
                
                <button type='submit' className='btn btn-primary w-100 mt-3'><i className='fas fa-user-plus me-1'></i> Signup</button>
                
            </form>

            <ToastContainer />
        </div>
    )
}

export default Signup