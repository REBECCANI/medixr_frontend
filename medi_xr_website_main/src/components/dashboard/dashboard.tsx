'use client';

import React, { useState, useEffect } from 'react';

interface LessonData {
  lesson_name: string;
  assignments_count: number;
}

const Dashboard = () => {
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lessons');
        if (response.ok) {
          const data: LessonData[] = await response.json();
          setLessons(data);
        } else {
          console.error('Failed to fetch lessons data');
        }
      } catch (error) {
        console.error('Error fetching lessons data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li key={lesson.lesson_name} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{lesson.lesson_name}</h2>
              <p>{lesson.assignments_count} Assignments</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
