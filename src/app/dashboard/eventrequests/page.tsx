"use client";
// App.tsx
import { GetEvents } from "@/lib/services";
import React, { useEffect, useState } from "react";
import { Event } from "../../../lib/interfaces/eventinterface";
import { columns } from "./columns";
import { DataTable } from "./datatable";

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        GetEvents().then((response) => {
          const visibleEvents = response.filter(
            (event: Event) => event.isVisible === false
          );
          setEvents(visibleEvents);
        });
      } catch (err) {
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="scrollable-container my-10 bg-white rounded-2xl px-6 container">
      <DataTable columns={columns} data={events} />
    </div>
  );
};

export default App;
