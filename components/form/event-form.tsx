'use client';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';

type FormData = {
  title: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  file: File | null;
};

const EventForm: React.FC = () => {
  const createEvent = useMutation(api.events.createEvent);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    file: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.file) {
      alert('Please fill out all fields and upload an image.');
      return;
    }

    try {
      // Step 1: Generate an upload URL
      const uploadUrl: string = await generateUploadUrl();
      console.log("Generated Upload URL:", uploadUrl);

      // Step 2: Upload the image file to the generated URL
      const uploadResponse: Response = await fetch(uploadUrl, {
        method: 'POST', // Ensure this matches the expected method
        headers: { 'Content-Type': formData.file.type },
        body: formData.file,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload failed:", errorText);
        throw new Error(`Image upload failed with status ${uploadResponse.status}`);
      }

      console.log("Image uploaded successfully!");

      // Step 3: Extract the storageId
      const { storageId } = await uploadResponse.json();

  

      // Step 4: Create the event with the uploaded image's storageId
      await createEvent({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        imageUrl: storageId,
      });

      // Clear the form after successful submission
      setFormData({
        title: '',
        description: '',
        category: '',
        date: '',
        startTime: '',
        endTime: '',
        file: null,
      });

      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Event Category"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="file">Event Image</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
