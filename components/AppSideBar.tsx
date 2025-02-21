"use client";

import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  User2,
  BarChart,
  Users,
  ShoppingCart,
  MessageSquare,
  LogOut,
} from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/store/userDataStore";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// Menu items.
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Products", url: "/dashboard/products", icon: Calendar },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Marketing", url: "/dashboard/marketing", icon: MessageSquare },
  { title: "Reports", url: "/dashboard/reports", icon: BarChart },
];

export function AppSidebar() {
  const { userData, clearUserData } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const logOut = () => {
    Cookies.remove("authToken");
    clearUserData();
    router.push("/");
  };

  return (
    <Sidebar className="border-r bg-red-500">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/logo.svg" alt="Company Logo" />
            {/* <AvatarFallback>BD</AvatarFallback> */}
          </Avatar>
          <span className="text-xl font-bold text-cyan-700">AdminPanel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-cyan-600 uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`group flex items-center space-x-3 rounded-md px-3 py-5 text-sm transition-all duration-200 ease-in-out ${
                      pathname === item.url
                        ? "bg-cyan-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-cyan-100"
                    }`}
                  >
                    <Link href={item.url} className="flex items-center w-full">
                      <item.icon
                        className={`h-5 w-5 mr-3 ${
                          pathname === item.url
                            ? "text-white"
                            : "text-cyan-500 group-hover:text-cyan-600"
                        }`}
                      />
                      <span className="flex-grow">{item.title}</span>
                      {pathname === item.url && (
                        <div className="h-2 w-2 rounded-full bg-white ml-2"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Separator className="my-4" />
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-2 hover:bg-cyan-100 transition-colors duration-200"
            >
              <Avatar className="h-8 w-8 border-2 border-cyan-500">
                <AvatarFallback className="bg-cyan-100 text-cyan-700">
                  {userData?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 flex-grow text-left font-medium text-gray-700">
                {userData?.name}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            alignOffset={-8}
            className="w-[200px] p-2"
          >
            <Link href="/dashboard/account">
              <DropdownMenuItem className="cursor-pointer hover:bg-cyan-50">
                <User2 className="mr-2 h-4 w-4 text-cyan-500" />
                <span>Account</span>
              </DropdownMenuItem>
            </Link>

            <Separator className="my-2" />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:bg-red-50"
              onClick={logOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
