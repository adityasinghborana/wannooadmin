"use client";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Cookie from 'js-cookie';
import Image from "next/image";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the login process
    try {
      const res = await signInWithEmailAndPassword(username, password);
      if (res?.user) {
        // Save user data in a cookie
        Cookie.set("user", JSON.stringify(res.user), { expires: 1 }); // Expires in 1 day
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false); // Set loading to false when login is complete
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white w-full">
      <div className="bg-black p-8 rounded-2xl shadow-md w-96 text-white">
        <Image
          src={`/admin/logo/Group.png`}
          alt="Logo"
          width={200}
          height={200}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold text-center mb-8">Sign-In</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-2 text-white"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="text-black w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="text-black w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
