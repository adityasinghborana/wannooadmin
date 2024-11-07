import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { GetChartData } from "@/lib/services";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const description = "View your dashboard data";

const chartConfig = {
  Users: {
    label: "Users",
    color: "#2196F3",
  },
  Vendors: {
    label: "Vendors",
    color: "#FF9800",
  },
  Bookings: {
    label: "Bookings",
    color: "#4CAF50",
  },
} satisfies ChartConfig;

export function DashboardChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Users");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [chartData, setChartData] = React.useState<any>({});

  const getChartData = async () => {
    // Fetching chart data for bookings, users, and vendors
    try {
      const res = await GetChartData({ startDate: date?.from, endDate: date?.to }, 'bookings');
      const res1 = await GetChartData({ startDate: date?.from, endDate: date?.to }, 'users');
      const res2 = await GetChartData({ startDate: date?.from, endDate: date?.to }, 'vendors');
      setChartData({
        bookings: res?.map((data: any) => ({ date: data.date, bookings: data.bookings })),
        users: res1?.map((data: any) => ({ date: data.date, users: data.Users })),
        vendors: res2?.map((data: any) => ({ date: data.date, vendors: data.Vendors })),
      });
    } catch (error) {
      
    }
  
    // Setting chart data
    // setChartData({
    //   bookings: [{ date: "january", bookings: 500 }, { date: "feb", bookings: 500 },{ date:  "march", bookings: 500 }],
    //   users: res1?.map((data: any) => ({ date: data.date, users: data.Users })),
    //   vendors: res2?.map((data: any) => ({ date: data.date, vendors: data.Vendors })),
    // });
  };
  
  const total = React.useMemo(() => ({
    Users: chartData?.users?.reduce((acc: any, curr: any) => acc + (curr.users), 0),
    Vendors: chartData?.vendors?.reduce((acc: any, curr: any) => acc + (curr.vendors), 0),
    Bookings: chartData?.bookings?.reduce((acc: any, curr: any) => acc + (curr.bookings), 0),
  }), [chartData]);

  React.useEffect(() => {
    getChartData();
  }, [date]);

  if (!chartData.users) return <>No data</>;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Charts</CardTitle>
          <CardDescription>
            Showing total visitors from{" "}
            {date?.from?.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            -{" "}
            {date?.to?.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </CardDescription>
        </div>
        <div className="flex">
          {["Users", "Vendors", "Bookings"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total]}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="mb-4">
          <div className={"grid gap-2"}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full bg-white hover:bg-white"
        >
          <BarChart
            accessibilityLayer
            data={chartData[activeChart.toLowerCase()]} // Dynamically setting the chart data based on activeChart
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date" // Assuming the 'date' field is used as the X-axis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  // dataKey={activeChart}
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart.toLowerCase()} // Assuming 'value' is the field for the chart's Y-axis data
              fill={chartConfig[activeChart].color}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
