'use client'; // Directive to indicate that this file is a client-side component

import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState hooks
import { Pie, Line } from 'react-chartjs-2'; // Import Pie and Line charts from react-chartjs-2
import { Chart as ChartJS, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData } from 'chart.js'; // Import necessary components and types from chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import chartjs-plugin-datalabels for displaying labels on charts

// Register the chart components and plugins with ChartJS
ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

interface CategoryChartData extends ChartData<'pie', number[], unknown> { // Define the TypeScript interface for the Pie chart data
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

const Dashboard = () => { // Define the Dashboard component
    const [chartData, setChartData] = useState<CategoryChartData | null>(null); // State to store Pie chart data
    const [user, setUser] = useState<{firstName: string, lastName: string} | null>(null); // State to store user data

    useEffect(() => { // useEffect hook to run fetch functions on component mount
        fetchCategoryStats(); // Fetch category stats for Pie chart
        fetchUserData(); // Fetch user data for displaying user info
    }, []); // Empty dependency array means this runs once after the initial render

    const fetchCategoryStats = async () => { // Function to fetch category statistics
        try {
            const response = await fetch('http://localhost:5000/api/category-stats'); // Fetch category stats from server
            const data = await response.json() as Record<string, number>; // Parse response as JSON

            const total = Object.values(data).reduce((sum, count) => sum + count, 0); // Calculate the total number of users
            const labels = Object.keys(data); // Extract category labels
            const dataPoints = Object.values(data).map((count) => (count / total) * 100); // Calculate percentage of each category

            setChartData({
                labels,
                datasets: [{
                    data: dataPoints,
                    backgroundColor: ['darkred', 'darkblue', 'darkpurple', 'darkorange'], // Color scheme for Pie chart
                    borderColor: ['darkred', 'darkblue', 'darkpurple', 'darkorange'], // Border colors for Pie chart
                    borderWidth: 1, // Border width of Pie chart slices
                }],
            });
        } catch (error) {
            console.error('Error fetching category stats:', error); // Log any errors encountered during fetch
        }
    };

    // Configuration options for the Pie chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const, // Position of the legend at the bottom
            },
            title: {
                display: true,
                text: 'User Categories', // Title of the Pie chart
            },
            datalabels: {
                display: true,
                color: 'white', // Color of the data labels
                formatter: (value: number) => `${value.toFixed(2)}%`, // Format data labels as percentages
                font: {
                    weight: 'bold' as const, // Bold font for data labels
                }
            }
        },
    };

    // Data for the Line chart
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // X-axis labels (months)
        datasets: [
            {
                label: 'Annual Average Statistics', // Label for the Line chart
                data: [20, 40, 50, 70, 80, 100, 120, 140, 160, 180, 200, 220], // Data points for the Line chart
                fill: false, // Disable filling under the line
                backgroundColor: 'blue', // Background color of the line
                borderColor: 'blue', // Border color of the line
            },
        ],
    };

    const fetchUserData = async() => { // Function to fetch user data
        try {
            const response = await fetch('http://localhost:5000/api/user'); // Fetch user data from server
            const userData = await response.json(); // Parse response as JSON
            setUser(userData); // Update user state with fetched data
        } catch(error) {
            console.log('Error fetching data', error); // Log any errors encountered during fetch
        }
    }

    return (
        <div className="flex h-screen bg-gray-100 bg-cover relative"> {/* Container with full height and background color */}
            <aside className="bg-white flex flex-col p-4 rounded-lg shadow-lg mr-4 z-10"> {/* Sidebar */}
                <div className="p-4 bg-white"> {/* Sidebar header */}
                    <h2 className="text-2xl font-bold">MediXR</h2> {/* Sidebar title */}
                </div>
                <nav> {/* Navigation menu */}
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="text-blue-600">Dashboard</a> {/* Dashboard link */}
                        </li>
                        <li className="mb-2">
                            <a href="#">Bookings</a> {/* Bookings link */}
                        </li>
                        <li className="mb-2">
                            <a href="#">Payments</a> {/* Payments link */}
                        </li>
                        <li className="mb-2">
                            <a href="/students">Students</a> {/* Students link */}
                        </li>
                        <li className="mb-20">
                            <button className="bg-purple-600 text-white p-2 rounded">Export Report</button> {/* Export Report button */}
                        </li>
                        <li className="mt-4">
                            <a href="#">Settings</a> {/* Settings link */}
                        </li>
                        <li className="mt-2">
                            <a href="#">Logout</a> {/* Logout link */}
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="w-3/4 p-4 flex flex-col"> {/* Main content area */}
                <div className="flex justify-between items-center mb-4"> {/* Header section */}
                    <div>
                        <h1 className="text-xl font-bold">Good Evening, {user ? `${user.firstName} ${user.lastName}` : 'User'}</h1> {/* Greeting message with user name */}
                        <p>You were able to score 92% the last week.</p> {/* Weekly score message */}
                    </div>
                </div>
                <div className="flex space-x-4 my-4"> {/* Summary cards */}
                    <div className="w-1/3 bg-green-100 p-4 rounded"> {/* Progress card */}
                        <h2 className="text-center">Progress</h2> {/* Card title */}
                        <p className="text-center text-2xl">64~72</p> {/* Progress value */}
                        <p className="text-center text-green-600">+18% +3.8k this week</p> {/* Progress change */}
                    </div>
                    <div className="w-1/3 bg-yellow-100 p-4 rounded"> {/* Scores card */}
                        <h2 className="text-center">Scores</h2> {/* Card title */}
                        <p className="text-center text-2xl">92%</p> {/* Score value */}
                        <p className="text-center text-yellow-600">+18% +2.8k this week</p> {/* Score change */}
                    </div>
                    <div className="w-1/3 bg-blue-100 p-4 rounded"> {/* Session Name card */}
                        <h2 className="text-center">Session Name</h2> {/* Card title */}
                        <p className="text-center text-2xl">ECG - Lab</p> {/* Session name */}
                        <p className="text-center text-blue-600">+18% +7.8k this week</p> {/* Session change */}
                    </div>
                </div>
                <div className="flex space-x-4"> {/* Charts section */}
                    <div className="w-1/2 bg-white p-4 rounded shadow"> {/* Line chart container */}
                        <h2 className="text-center">Annual Average Statistics</h2> {/* Chart title */}
                        <Line data={lineData} /> {/* Render Line chart */}
                    </div>
                    <div className="w-1/2 bg-white p-4 rounded shadow" style={{ overflow: 'hidden', height: '600px' }}> {/* Pie chart container with fixed height */}
                        <h2 className="text-center">Stats by Category</h2> {/* Chart title */}
                        {chartData && <Pie data={chartData} options={options} />} {/* Render Pie chart if data is available */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard; // Export the Dashboard component
