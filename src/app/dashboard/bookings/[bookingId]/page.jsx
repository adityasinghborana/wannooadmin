"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetBookingDetail } from "@/lib/services";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const BookingDetail = () => {
  const params = useParams();
  const BookingId = params.bookingId;
  const [booking, setBooking] = useState(null);
  const bookingId = parseInt(BookingId);
  const excludedFields = [
    "bookingResult",
    "adultRate",
    "childRate",
    "downloadRequired",
    "createdAt",
    "status",
    "serviceUniqueId",
    "bookingId",
  ];
  useEffect(() => {
    if (bookingId) {
      const fetchBooking = async () => {
        try {
          const data = await GetBookingDetail(bookingId); // Fetch booking details by ID
          setBooking(data);
        } catch (error) {
          console.error("Failed to fetch booking details:", error);
        }
      };
      fetchBooking();
    }
  }, [bookingId]);

  if (!booking) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div>
      <Card className="my-10 rounded-2xl shadow-2xl py-4">
        <CardHeader>
          <div className="grid grid-cols-3 gap-7">
            <CardTitle>
              <strong>Status:</strong> {booking.status}
            </CardTitle>
            <CardTitle>
              <strong>Service Unique ID:</strong> {booking.serviceUniqueId}
            </CardTitle>
            <CardTitle>
              <strong>Booking ID:</strong> {booking.bookingId}
            </CardTitle>
          </div>
        </CardHeader>

        <div className="grid grid-cols-3 gap-2">
          {Object.keys(booking)
            .filter((key) => !excludedFields.includes(key))
            .map((key) => (
              <CardContent key={key} className="flex flex-row w-full">
                <div>
                  <strong>{key.toUpperCase()}</strong>:
                  <span>{booking[key]}</span>
                </div>
              </CardContent>
            ))}
        </div>

        <CardContent className="grid grid-cols-3 gap-2">
          <div>
            <strong>DATE:</strong>
            {booking.createdAt.slice(0, 10).split("-").reverse().join("/")}
          </div>
          <div className="mx-8">
            <strong>USER:</strong>
            <span>
              {booking.bookingResult.user.username ?? "name not inserted"}
            </span>
          </div>
          <div>
            <strong>USER EMAIL:</strong>
            {booking.bookingResult.user.email ?? "email not present"}
          </div>
        </CardContent>
      </Card>
      <div>
        <Button className="text-white rounded-xl">
          Send Confirmation Mail
        </Button>
      </div>
    </div>
  );
};

export default BookingDetail;
