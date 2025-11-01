import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const userName = localStorage.getItem('userName');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [expenses, setExpenses] = useState([]);
    const [todayTotal, setTodayTotal] = useState(0);
    const [yesterdayTotal, setYesterdayTotal] = useState(0);
    const [last7DaysTotal, setLast7DaysTotal] = useState(0);
    const [last30DaysTotal, setLast30DaysTotal] = useState(0);
    const [currentYearTotal, setCurrentYearTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);


    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        fetchExpenses(userId);
    }, []);

    const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}/`)
            const data = await response.json();
            setExpenses(data);
            calculateTotals(data);
        }
        catch (error) {
            console.error("Error while fetching expenses: ", error)
        }
    };

    const calculateTotals = (data) => {
        const today = new Date();
        
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const last7Days = new Date();
        last7Days.setDate(today.getDate() - 7);
        
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const currentYear = today.getFullYear();

        let todaySum = 0, yesterdaySum = 0, last7DaysSum = 0, last30DaysSum = 0, yearSum = 0 , grandSum = 0
        

        data.forEach(item=>{
            const expenseDate = new Date(item.ExpenseDate); 
            const amount = parseFloat(item.ExpenseCost) || 0;

            if(expenseDate.toDateString() === today.toDateString()){
                todaySum += amount
            }

            if(expenseDate.toDateString() === yesterday.toDateString()){
                yesterdaySum += amount
            }
            
            if(expenseDate >= last7Days){
                last7DaysSum += amount
            }
            
            if(expenseDate >= last30Days){
                last30DaysSum += amount
            }
            
            if(expenseDate.getFullYear() === currentYear){
                yearSum += amount
            }

            grandSum += amount;
        })

        setTodayTotal(todaySum);
        setYesterdayTotal(yesterdaySum);
        setLast7DaysTotal(last7DaysSum);
        setLast30DaysTotal(last30DaysSum);
        setCurrentYearTotal(yearSum);
        setGrandTotal(grandSum);
    }
    return (
        <div className='container mt-4'>
            <div className='text-center'>
                <h1>Welcome {userName}😎</h1>
                <p className='text-muted'> Here's your expense overview</p>
            </div>

            <div className='row g-4'>
                <div className='col-md-4'>
                    <div className='card bg-primary text-white text-center mb-3' style={{ height: 150 }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar-day me-2'></i>Today's Expense</h5>
                            <p className='cart-text fs-4'>₹{todayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card bg-warning text-white text-center mb-3' style={{ height: 150 }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar-minus me-2'></i>Yesterday's Expense</h5>
                            <p className='cart-text fs-4'>₹{yesterdayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card bg-success text-white text-center mb-3' style={{ height: 150 }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar-week me-2'></i>Last 7 days Expense</h5>
                            <p className='cart-text fs-4'>₹ {last7DaysTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card bg-danger text-white text-center mb-3' style={{ height: 150 }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar-alt me-2'></i>Last 30 days Expense</h5>
                            <p className='cart-text fs-4'>₹ {last30DaysTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card bg-secondary text-white text-center mb-3' style={{ height: 150 }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar me-2'></i>Current Year Expense</h5>
                            <p className='cart-text fs-4'>₹ {currentYearTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card bg-primary text-white text-center mb-3' style={{ height: 150 }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-wallet me-2'></i>Grand Expense</h5>
                            <p className='cart-text fs-4'>₹ {grandTotal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard