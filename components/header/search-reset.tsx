'use client'
import React from 'react'
import Link from "next/link";
import { FiSearch, FiX } from 'react-icons/fi';



const SearchReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if(form) form.reset();
    }

    return (
         <button
         type="reset" 
         onClick={reset}
            className="absolute right-3 text-gray-500 hover:text-gray-700"
        >
         <Link   href={'/'}>
         <FiX />
         </Link>           
        </button>
    )
}

export default SearchReset