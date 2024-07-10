"use client";
import { auth } from "@/firebase/config";
import { CheckIsVendor } from "@/lib/services";
import { CheckIsAdmin } from "@/lib/store/features/isAdmin/isAdminSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e: any) => {
    try {
      const res = await signInWithEmailAndPassword(username, password);
      //localStorage.setItem("user", JSON.stringify(res?.user));
      console.log(res?.user.uid);
      let data = await CheckIsVendor(res?.user?.uid ?? "nun");

      if (data?.data?.isAdmin == true) {
        dispatch(CheckIsAdmin(true));
      } else {
        dispatch(CheckIsAdmin(false));
      }
      router.push("/dashboard");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Sign-In</h1>
        {/* <form onSubmit={handleLogin}> */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-2 text-gray-300"
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
            className="block text-sm font-semibold mb-2 text-gray-300"
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
          onClick={(e) => {
            handleLogin(e);
          }}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Login
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default SignIn;
