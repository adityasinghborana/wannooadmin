"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GetCoupons,
  GetEvents,
  createCoupons,
  deleteCoupon,
  getAllTours,
} from "@/lib/services";
import { Separator } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addUsers } from "@/lib/store/features/user/userSlice";
interface Coupon {
  id: number;
  name: string;
  discount: number;
  type: string;
  tourid?: String;
  eventid?: String;
}
type CouponFormData = yup.InferType<typeof couponSchema>;
const couponSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  discount: yup
    .number()
    .required("Discount is required")
    .positive("Discount must be positive"),
  type: yup.string().required("Type is required"),
  tourid: yup.number(),
  eventid: yup.number(),
});

const Coupon = () => {
  const onSubmit = (data: CouponFormData) => {
    console.log(data);
    const res = createCoupons(data).then((value) => {
      console.log(value);
      fetchCoupons();
    });
  };
  const form = useForm<CouponFormData>({
    resolver: yupResolver(couponSchema),
  });
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const Tours = useAppSelector((state) => state.tour.Tours);
  const [tourData, setTourData] = useState(Tours);
  const [eventData, setEventData] = useState(Tours);

  useEffect(() => {
    Tours.length === 0 &&
      getAllTours().then((data) => {
        setTourData(data);
      });
    GetEvents().then((data) => setEventData(data));
  }, []);

  const fetchCoupons = async () => {
    const data = await GetCoupons();

    setCoupons(data.result);
  };
  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="h-screen">
      <ScrollArea className="h-1/2 w-full rounded-2xl border ">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Coupons</h4>
          {Array.isArray(coupons) && coupons.length > 0 ? (
            coupons.map((coupon) => (
              <React.Fragment key={coupon.id}>
                <div className="text-sm grid grid-cols-5 items-center">
                  <div>{coupon.id}</div>
                  <div>
                    <strong className="mr-3">Name:</strong>
                    {coupon.name}
                  </div>
                  <div>
                    <strong className="mr-3">Discount:</strong>
                    {coupon.discount}
                  </div>
                  <div>
                    <strong className="mr-3">Type:</strong>
                    {coupon.type}
                  </div>
                  <div>
                    <Button
                      className="bg-red-400 hover:bg-red-600"
                      onClick={() => {
                        deleteCoupon(coupon.id).then(() => {
                          fetchCoupons();
                        });
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))
          ) : (
            <div>No coupons to display</div>
          )}
        </div>
      </ScrollArea>
      <div className="my-8">
        <Card className="rounded-2xl bg-white shadow-2xl">
          <CardHeader>
            <CardTitle>Add New Coupon</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-5 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coupon Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Value</FormLabel>
                        <FormControl>
                          <Input placeholder="20" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Flat">Flat</SelectItem>
                            <SelectItem value="%">Percentage</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tourid"
                    defaultValue={0}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tour</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Tour" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {tourData.map((tour) => (
                              <SelectItem
                                key={tour.id}
                                value={`${tour.tourId}`}
                              >
                                {tour.tourName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eventid"
                    defaultValue={0}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Event" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {eventData.length > 0 &&
                              eventData.map((event) => (
                                <SelectItem
                                  key={event?.id * 1000}
                                  value={`${event?.id}`}
                                >
                                  {event?.eventName}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className=" text-white rounded-xl">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coupon;
