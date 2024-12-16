import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Form from "next/form";
import SearchReset from './search-reset';


const Search = ({ query }: { query?: string }) => {


  return (
    <div className="w-full lg:max-w-md mx-auto p-2">
      <Form action="/" scroll={false}  className="relative flex items-center">
        {/* Search Icon */}
        <FiSearch className="absolute left-3 p-1 bg-gray-800 text-xl rounded-full  text-gray-100" />

        {/* Input Field */}
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search..."
          className="w-full pl-10 pr-10 py-2 rounded-full shadow-sm border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        {/* Clear Icon */}
        {query &&
        <SearchReset />
        }
      </Form>
    </div>
  );
};

export default Search;
