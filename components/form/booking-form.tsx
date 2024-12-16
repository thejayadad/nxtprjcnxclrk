'use client';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import React, { useState, FormEvent } from 'react';
import { Id } from "@/convex/_generated/dataModel"; // Import Convex's Id utility

type BookingFormProps = {
  classId: string; // The raw event ID string (e.g., fetched from a URL or API)
};

const BookingForm: React.FC<BookingFormProps> = ({ classId }) => {
  const createBooking = useMutation(api.bookings.createBooking);

  const [status, setStatus] = useState<string>("confirmed");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const userId = "user-id-placeholder"; // Replace with the logged-in user's ID from your auth system

      // Convert classId from string to Id<"events">
      const eventId: Id<"events"> = { __tableName: "events", id: classId } as unknown as Id<"events">;

      await createBooking({ userId, classId: eventId, status });
      alert("Booking created successfully!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="status">Booking Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="confirmed">Confirmed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Book Event"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
