"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { GetChartData } from "@/lib/services";

export const description = "View your dashboard data";



const chartConfig = {
  views: {
    label: "Page Views",
  },
  user: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  vendor: {
    label: "Vendors",
    color: "hsl(var(--chart-2))",
  },
  booking: {
    label: "Bookings",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DashboardChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("user");
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
      })
    const [chartData, setrChartData] =  React.useState<any>([])
  
  const getChartData = async () => {  
  const res = await GetChartData({startDate:date?.from, endDate:date?.to});
  console.log(res[0]?.date)
  setrChartData([{date:res[0]?.date, user:res[0]?.users || 0, vendor:res[0]?.vendors || 0, bookings:res[0]?.bookings || 0}])  
  };

  const total = React.useMemo(
    () => ({
      user: chartData?.reduce((acc:any, curr:any) => acc + curr.user, 0),
      vendor: chartData?.reduce((acc:any, curr:any) => acc + curr.vendor, 0),
      booking: chartData?.reduce((acc:any, curr:any) => acc + curr.bookings, 0),
    }),
    []
  );

  React.useEffect(() => {
    getChartData();
  }, [date]);

 if(!chartData) return <>No data</>

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Charts</CardTitle>
          <CardDescription>
            Showing total visitors from {date?.from?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {date?.to?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </CardDescription>
        </div>
        <div className="flex">
          {["user", "vendor", "booking"].map((key) => {
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
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
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
                  className="w-[150px]"
                  nameKey="views"
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
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
