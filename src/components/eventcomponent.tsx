import React from "react";
import { Event } from "../lib/interfaces/eventinterface";

interface Props {
  event: Event;
}

const EventComponent: React.FC<Props> = ({ event }) => {
  return (
    <div>
      <h2>{event.eventName}</h2>
      <p>Duration: {event.duration}</p>
      <img src={event.imagePath} alt={event.eventName} />
      <p>Type: {event.eventType}</p>
      <p>Recommended: {event.recommended ? "Yes" : "No"}</p>
      <h3>Details:</h3>
      {event.eventdetail.map((detail) => (
        <div key={detail.id}>
          <p>Description: {detail.description}</p>
          <p>Date: {new Date(detail.date).toLocaleDateString()}</p>
          <p>Location: {detail.location}</p>
          <p>Artist: {detail.artistname}</p>
          <img src={detail.artistimage} alt={detail.artistname} />
          <p>More Info: {detail.moreinfo}</p>
          <p>Ticket Info: {detail.ticketinfo}</p>
          <p>Min Age: {detail.minage}</p>
          <p>
            Last Booking Time:{" "}
            {new Date(detail.lastbookingtime).toLocaleString()}
          </p>
          <p>Is Child Allowed: {detail.ischildallowed ? "Yes" : "No"}</p>
          <p>Is Adult Allowed: {detail.isadultallowed ? "Yes" : "No"}</p>
          <p>Is Infant Allowed: {detail.isinfantallowed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
