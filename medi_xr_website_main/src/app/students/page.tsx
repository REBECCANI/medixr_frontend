'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const lessons = ['ECG-Lab', 'Anatomy Lab', 'Surgery lab', 'AI training', 'Multi-user collaboration', 'surgery recordings lab'];

const Students = () => {
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLessonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLesson(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid file type (PDF or Word document)');
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedLesson || !file) {
      alert('Please select a lesson and a file');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('lesson', selectedLesson);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('File uploaded successfully');
        setSelectedLesson('');
        setFile(null);
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Lessons and Assignments</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select Lesson:</label>
          <select
            value={selectedLesson}
            onChange={handleLessonChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a lesson</option>
            {lessons.map((lesson) => (
              <option key={lesson} value={lesson}>
                Lesson {lesson.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Upload File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Students;