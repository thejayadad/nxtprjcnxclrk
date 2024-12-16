'use client'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'


const EventList = () => {
  const events = useQuery(api.events.listEvents)

  return (
    <div className='p-4'>
        {
          events?.map(event => (
            <div key={event._id}>
              {event.title}
            </div>
          ))
        }
    </div>
  )
}

export default EventList