'use client';

import { FaSearch } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import Songs from '../../music/songs/Song';

export default function FullSearchBar({ hideFullSearch }) {
  return (
    <section className='absolute top-0 z-10 right-0 h-screen w-screen bg-black grid grid-cols-4 gap-4 px-4'>
      <section className='fixed top-0 z-20 right-0 col-span-4'>
        <label htmlFor="" className='w-full grid grid-cols-5 bg-neutralViolet-50 p-2 justify-items-center items-baseline'>
          <button onClick={hideFullSearch}>
            <FaArrowLeft className='basic-button text-black' />
          </button>
          <input className='text-lg text-black bg-neutralViolet-50 p-1 col-span-3 ' />
          <FaSearch className='basic-button text-black' />
        </label>
      </section>
      <section className='mt-12 pb-48 col-span-4'>
        <Songs />
        <Songs />
        <Songs />
        <Songs />
        <Songs />
        <Songs />

      </section>
    </section>
  );
}
