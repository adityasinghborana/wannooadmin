"use client"
import { getForms } from '@/lib/services';
import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"


interface FormData {
    name: string;
    email: string;
    message: string;
    // Add more properties as per your actual data structure
}

const Forms: React.FC = () => {
    const [forms, setForms] = useState<FormData[]>([]); // Explicitly define forms as an array of FormData

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formsData: FormData[] = await getForms(); // Ensure getForms returns FormData array
                setForms(formsData); // Update forms state with fetched data
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };

        fetchData(); // Call fetchData function inside useEffect

    }, []); 
  return (
    

    <ScrollArea className=" my-6 h-[700px] w-full rounded-md  p-4">
        <div className="-my-4 border-spacing-12">
            {forms.map((form, index) => (
                <div key={index} className="py-8 my-4 px-8 flex flex-wrap md:flex-nowrap bg-secondary-foreground rounded-2xl border-[2px]">
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <div className='flex flex-row gap-4'>
                      <span className="font-semibold title-font text-gray-700"> Name: </span>
                      <span className="font-semibold title-font text-gray-700">{form.name.toUpperCase()}</span>
                      </div>
               
                    </div>
                    <div className="md:flex-grow">
                    <div className='flex flex-row gap-4'>
                    <span className="text-lg font-semibold title-font text-gray-700"> Email - </span>
                    <h2 className="text-lg font-semibold  text-gray-700 title-font mb-2">{form.email}</h2>
                    </div>
                    <div className='flex flex-row gap-4'>
                    <span className="font-semibold title-font text-gray-700"> Message: </span>
                        <p className="leading-relaxed">{form.message}</p></div>
                    </div>
                </div>
            ))}
        </div>
        </ScrollArea>


  )
}

export default Forms