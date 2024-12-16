'use client'
import React from 'react'
import Box from './box'
import CatItem from './cat-item'
import { useSearchParams } from 'next/navigation'


export const categories = [
  {
    label: 'Yoga'
  },
  {
    label: 'HIIT'
  },
  {
    label: 'Strength'
  },
  {
    label: 'Swim'
  }
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  return (
    <Box>
      <div className='pt-4 flex items-center justify-between overflow-x-auto'>
        {categories.map((cat) => (
          <CatItem
          key={cat.label}
          label={cat.label}
          selected={category === cat.label}
          />
        ))}
      </div>
    </Box>
  )
}

export default Categories