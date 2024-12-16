import React from 'react'

interface BoxProps {
    children: React.ReactNode;
}

const Box: React.FC<BoxProps>= ({children}) => {
  return (
    <div className='mx-auto max-w-screen-xl xl:px-20 md:px-10 sm:px-2 p-4'>
        {children}
    </div>
  )
}

export default Box