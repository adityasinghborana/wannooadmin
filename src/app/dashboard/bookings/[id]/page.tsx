import React from "react";

const SingleBookings = ({ params }: { params: { id: number } }) => {
  return <div>{params.id}</div>;
};

export default SingleBookings;
