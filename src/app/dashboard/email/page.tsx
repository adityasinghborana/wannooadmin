"use client";
import Container from '@/app/ui/dashboard/container/Container';
import { getEmail, updateEmail } from '@/lib/services';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const EmailEditor: React.FC = () => {
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  useEffect(() => {
    const getValues= async ()=>{
      let res = await getEmail()
      setSubject(res?.subject)
      setBody(res?.body)
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dataToPost = {
      subject,
      body,
    }
    // Handle form submission here
    await updateEmail(dataToPost)
    console.log({
      subject,
      body,
    });
  };

  return (
    <Container className="items-center">
      <div className='overflow-y-auto'  style={{ height: "calc(100vh - 10rem)" }}>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Body</label>
          <ReactQuill
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            theme="snow"
            value={body}
            onChange={handleBodyChange}            
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
      </div>
    </Container>
  );
};

export default EmailEditor;
