'use client';
import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

interface CategoryChartData extends ChartData<'pie', number[], unknown> {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

const Dashboard = () => {
    const [chartData, setChartData] = useState<CategoryChartData | null>(null);

    useEffect(() => {
        fetchCategoryStats();
    }, []);

    const fetchCategoryStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/category-stats');
            const data = await response.json() as Record<string, number>;

            const total = Object.values(data).reduce((sum, count) => sum + count, 0);
            const labels = Object.keys(data);
            const dataPoints = Object.values(data).map((count) => (count / total) * 100);

            setChartData({
                labels,
                datasets: [{
                    data: dataPoints,
                    backgroundColor: ['darkred', 'darkblue', 'darkpurple', 'darkorange'],
                    borderColor: ['darkred', 'darkblue', 'darkpurple', 'darkorange'],
                    borderWidth: 1,
                }],
            });
        } catch (error) {
            console.error('Error fetching category stats:', error);
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'User Categories',
            },
            datalabels: {
                display: true,
                color: 'white',
                formatter: (value: number) => `${value.toFixed(2)}%`,
                font: {
                    weight: 'bold' as const,
                }
            }
        },
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Annual Average Statistics',
                data: [20, 40, 50, 70, 80, 100, 120, 140, 160, 180, 200, 220],
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
            },
        ],
    };

    return (
        <div className="flex h-screen bg-gray-100 bg-cover relative">
            <aside className="bg-white flex flex-col p-4 rounded-lg shadow-lg mr-4 z-10">
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
            <main className="w-3/4 p-4 flex flex-col">
                <h1 className="text-xl font-bold">Good Evening, Robert MUGABE</h1>
                <p>You were able to score 92% the last week.</p>
                <div className="flex space-x-4 my-4">
                    <div className="w-1/3 bg-green-100 p-4 rounded">
                        <h2 className="text-center">Progress</h2>
                        <p className="text-center text-2xl">64~72</p>
                        <p className="text-center text-green-600">+18% +3.8k this week</p>
                    </div>
                    <div className="w-1/3 bg-yellow-100 p-4 rounded">
                        <h2 className="text-center">Scores</h2>
                        <p className="text-center text-2xl">92%</p>
                        <p className="text-center text-yellow-600">+18% +2.8k this week</p>
                    </div>
                    <div className="w-1/3 bg-blue-100 p-4 rounded">
                        <h2 className="text-center">Session Name</h2>
                        <p className="text-center text-2xl">ECG - Lab</p>
                        <p className="text-center text-blue-600">+18% +7.8k this week</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2 bg-white p-4 rounded shadow">
                        <h2 className="text-center">Annual Average Statistics</h2>
                        <Line data={lineData} />
                    </div>
                    <div className="w-1/2 bg-white p-4 rounded shadow" style={{ overflow: 'hidden', height: '600px' }}>
                        <h2 className="text-center">Stats by Category</h2>
                        {chartData && <Pie data={chartData} options={options} />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
