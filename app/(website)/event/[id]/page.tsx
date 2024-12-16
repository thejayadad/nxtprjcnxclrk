'use client';

import BookingForm from '@/components/form/booking-form';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';
import { Id } from '@/convex/_generated/dataModel'; // Import Convex's Id utility
import { use } from "react";




const EventPage =  ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);

  const event = useQuery(api.events.getEventById, {
    id: id
  })
  if (!event) {
    return (
      <div className="relative pt-28 p-4">
        <p>Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="relative pt-28 p-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>
 
    
    </div>
  );
};

export default EventPage;
