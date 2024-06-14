"use client"
import { getEmail } from '@/lib/services';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = () => {
  const [value, setValue] = useState('');

  const handleChange = (content:any, delta:any, source:any, editor:any) => {
    setValue(content);
  };

  useEffect(()=>{
    const geteEmail= async ()=>{
      let res = await getEmail()
      setValue(res.body)
    }
    geteEmail()
  },[])

  return (
    <div className='bg-white min-h-[80vh] mt-5'>
      <ReactQuill
        className='text-black'
        theme="snow"
        value={value}
        style={{ height: '74vh' }}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuillEditor;
