"use client";
import { DateRangePicker } from "@/components/dashboardHome/date-range-picker";
import { Overview } from "@/components/dashboardHome/overview";
import { RecentOrders } from "@/components/dashboardHome/recent-orders";
import { UserSignups } from "@/components/dashboardHome/user-signups";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardData } from "@/hooks/dashboardHook";
import { useState } from "react";
import { moneyFormatter } from "../utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const getTodayRange = () => {
    const now = new Date();

    // Start of today (midnight)
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfDayString = `${startOfDay.getFullYear()}-${String(
      startOfDay.getMonth() + 1
    ).padStart(2, "0")}-${String(startOfDay.getDate()).padStart(
      2,
      "0"
    )} 00:00:00`;

    // Current time today
    const currentTimeString = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    return {
      from: startOfDayString,
      to: currentTimeString,
    };
  };

  const [date, setDate] = useState(getTodayRange());

  //get current year
  const getYear = new Date().getFullYear();

  const currentYear = getYear.toString();

  const [cardsData, salesOverview, userSignupsData, recentOrders] =
    useGetDashboardData(date, currentYear);

  return (
    <div className="flex-1 space-y-4 p-10   w-full">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <DateRangePicker setDate={setDate} date={date} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          {cardsData?.isLoading ? (
            <CardContent>
              <Skeleton className="h-8 w-full"></Skeleton>
            </CardContent>
          ) : cardsData?.isError ? (
            <CardContent>- </CardContent>
          ) : (
            <CardContent>
              <div className="text-2xl font-bold">
                {cardsData?.data?.totalUsers}
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p> */}
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          {cardsData?.isLoading ? (
            <CardContent>
              <Skeleton className="h-8 w-full"></Skeleton>
            </CardContent>
          ) : cardsData?.isError ? (
            <CardContent>- </CardContent>
          ) : (
            <CardContent>
              <div className="text-2xl font-bold">
                {moneyFormatter.format(cardsData?.data?.totalRevenue)}
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          {cardsData?.isLoading ? (
            <CardContent>
              <Skeleton className="h-8 w-full"></Skeleton>
            </CardContent>
          ) : cardsData?.isError ? (
            <CardContent>- </CardContent>
          ) : (
            <CardContent>
              <div className="text-2xl font-bold">
                {cardsData?.data?.totalSales === 0
                  ? `${cardsData?.data?.totalSales}`
                  : `+ ${cardsData?.data?.totalSales}`}
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +19% from last month
              </p> */}
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          {cardsData?.isLoading ? (
            <CardContent>
              <Skeleton className="h-8 w-full"></Skeleton>
            </CardContent>
          ) : cardsData?.isError ? (
            <CardContent>- </CardContent>
          ) : (
            <CardContent>
              <div className="text-2xl font-bold">
                {cardsData?.data?.totalProducts}
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p> */}
            </CardContent>
          )}
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          {salesOverview.isLoading ? (
            <CardContent>
              <Skeleton className="h-[350px] w-full"></Skeleton>
            </CardContent>
          ) : (
            <CardContent className="pl-2">
              <Overview data={salesOverview?.data?.salesData} />
            </CardContent>
          )}
        </Card>
        <Card className="sm:col-span-3 col-span-fulls">
          <CardHeader>
            <CardTitle>User Signups</CardTitle>
          </CardHeader>
          {userSignupsData?.isLoading ? (
            <CardContent>
              <Skeleton className="h-[350px] w-full"></Skeleton>
            </CardContent>
          ) : (
            <CardContent className="pl-2">
              <UserSignups data={userSignupsData?.data?.userSignupsData} />
            </CardContent>
          )}
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          {recentOrders.isLoading ? (
            <div className="p-5">
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <CardContent>
              <RecentOrders data={recentOrders?.data?.orders} />
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
