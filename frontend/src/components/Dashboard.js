import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const userName = localStorage.getItem('userName');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    }, []);

    return (
        <div className='container mt-4'>
            <div className='text-center'>
                <h1>Welcome {userName}😎</h1>
                <p className='text-muted'> Here's your expenses overview</p>
            </div>
        </div>
    )
}

export default Dashboard