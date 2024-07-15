"use client"
import { getForms } from '@/lib/services';
import React, { useState, useEffect } from 'react';

interface FormData {
    name: string;
    mobilenumber: string;
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
    
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
            {forms.map((form, index) => (
                <div key={index} className="py-8 px-8 flex flex-wrap md:flex-nowrap bg-primary-foreground rounded-2xl">
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span className="font-semibold title-font text-gray-700">{form.name.toUpperCase()}</span>
                        <span className="mt-1 text-gray-500 text-sm">{form.mobilenumber}</span>
                    </div>
                    <div className="md:flex-grow">
                        <h2 className="text-lg font-medium text-gray-900 title-font mb-2">{form.email}</h2>
                        <p className="leading-relaxed">{form.message}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

  )
}

export default Forms