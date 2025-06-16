import axios from 'axios';
import React from 'react'
import { BreedsProvider } from './BreedsContext';

async function getBreeds() {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dog-breeds`);
  return res.data;
}

const BreedsLayout = async ({children}: {children: React.ReactNode}) => {
    const breeds = await getBreeds();

  return (
    <BreedsProvider breeds={breeds}>
        <div className="min-h-screen w-full bg-gray-50 text-gray-800">
            {children}
        </div>
    </BreedsProvider>
  )
}

export default BreedsLayout