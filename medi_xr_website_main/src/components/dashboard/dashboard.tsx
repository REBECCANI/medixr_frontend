"use client";

import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
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

  const doughnutData = {
    labels: ['Doctors', 'Students', 'Health centers', 'Sponsors'],
    datasets: [
      {
        data: [33, 29.1, 22.2, 15.8],
        backgroundColor: ['red', 'blue', 'purple', 'orange'],
        hoverBackgroundColor: ['darkred', 'darkblue', 'darkpurple', 'darkorange'],
      },
    ],
  };

  return (
    <div className="flex">
      <aside className="w-1/4 bg-gray-100 p-4">
        <div className="mb-4">
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
            <li className="mb-2">
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
      <main className="w-3/4 p-4">
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
          <div className="w-1/2 bg-white p-4 rounded shadow">
            <h2 className="text-center">Stats by Category</h2>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
