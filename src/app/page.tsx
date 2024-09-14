// pages/pendingApproval.tsx
import { FC } from 'react';
import Head from 'next/head';

const PendingApproval: FC = () => {
  return (
    <>
      <Head>
        <title>Approval Pending</title>
        <meta name="description" content="Your approval is pending. Please try back again later." />
      </Head>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
          <h1 className="text-2xl font-bold mb-4">Approval Pending</h1>
          <p className="text-gray-700">
            Your approval is pending. Please try again later.
          </p>
        </div>
      </div>
    </>
  );
};

export default PendingApproval;
