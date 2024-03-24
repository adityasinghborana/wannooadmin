'use client'
import TourCard from '@/app/ui/tours/tourCards';
import { getAllTours } from '@/lib/services';
import React, { useEffect, useState } from 'react';

const Tours: React.FC = () => {
    const [allTours,setAllTours] = useState<any[]>([])

    useEffect(()=>{
        const getTours = async () => {
            let res = await getAllTours()
            setAllTours(res)  
            console.log(res)          
        }
        getTours()
    },[])

  return (
  <div className='grid grid-cols-3 gap-5 mt-5'>
    {allTours.map((tours)=>(
        <TourCard {...tours} />
    ))}
  </div>);
};

export default Tours;
