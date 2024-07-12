import React from 'react';

const Dashboard = () => {   
    return (
        <div className="flex h-screen bg-gray-100 bg-cover">
            <aside className="bg-white flex flex-col p-4 rounded-lg shadow-lg mr-4">
                <div className="p-4 bg-white">
                    <h2 className="text-2xl font-bold">MediXR</h2>
                </div>
                <nav>
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="text-blue-600">Dashboard</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Bookings</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Payments</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Students</a>
                        </li>
                        <li className="mb-20">
                            <button className="bg-purple-600 text-white p-2 rounded">Export Report</button>
                        </li>
                        <li className="mt-4">
                            <a href="#">Settings</a>
                        </li>
                        <li className="mt-2">
                            <a href="#">Logout</a>
                        </li>
                    </ul>
                </nav>
            </aside>

        </div>
    );
};

export default Dashboard;
