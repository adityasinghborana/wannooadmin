"use client"
import { useState } from 'react'
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/firebase/config'
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [createUserWithEmailAndPassword]  = useCreateUserWithEmailAndPassword(auth)

  const handleSignup = async (e:any) => {

    try {
        const res = await createUserWithEmailAndPassword(email, password)
        sessionStorage.setItem('user', JSON.stringify(res?.user))
        setEmail('')
        setPassword('')
    } catch (error) {
        console.error(error)
    }

    // e.preventDefault();
    // // Basic validation
    // if (!email || !password) {
    //   setError('Please enter both email and password');
    //   return;
    // }
    // // Perform your signup logic here, for demonstration, just redirect to home page
    // router.push('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
        {/* <form> */}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              className="text-black w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              className="text-black w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSignup} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Sign Up</button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default SignupPage;
