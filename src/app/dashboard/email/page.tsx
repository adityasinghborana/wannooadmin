"use client"
import Container from '@/app/ui/dashboard/container/Container';
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
    <Container>
      <ReactQuill
        className='text-black'
        theme="snow"
        value={value}
        style={{ height: '74vh' }}
        onChange={handleChange}
      />
    </Container>
  );
};

export default QuillEditor;
