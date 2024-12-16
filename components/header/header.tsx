'use client'
import React from 'react'
import Logo from '../logo'
import Box from '../box'
import Search from './search'
import NavLinks from './nav-links'
import { UserButton } from '@clerk/clerk-react'
import MobileMenu from './mobile-menu'


const Header = () => {
  return (
    <header className='w-full z-10 fixed shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Box>
                <div className='flex items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                    <Search />
                    <div className='hidden lg:block'>
                    <NavLinks />
                    <UserButton />
                    </div>
                    <div className='block lg:hidden'>
                        <MobileMenu />
                    </div>
                </div>
            </Box>
        </div>
    </header>
  )
}

export default Header