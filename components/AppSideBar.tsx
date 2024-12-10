"use client";

import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Settings,
  User2,
  BarChart,
  Users,
  ShoppingCart,
  MessageSquare,
} from "lucide-react";
import Cookies from "js-cookie";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useUserStore from "@/store/userDataStore";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
    items: [
      "All Orders",
      "Pending Orders",
      "Fulfilled Orders",
      "Returns & Cancellations",
      "Manage Shipping Labels",
    ],
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Calendar,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Marketing",
    url: "/dashboard/marketing",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: BarChart,
  },
];

export function AppSidebar() {
  const { userData, clearUserData } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const logOut = () => {
    Cookies.remove("authToken");
    clearUserData();
    router.push("/");
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          {/* <Image
            src="/logo.svg"
            alt="Company Logo"
            width={32}
            height={32}
            className="rounded-md"
          /> */}
          <span className="text-lg font-bold">Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground">
            MAIN MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      pathname === item.url
                        ? "flex items-center space-x-3 rounded-md px-3 py-6 text-sm transition-colors hover:bg-cyan-200 hover:text-primary bg-cyan-500 text-white"
                        : "flex items-center space-x-3 rounded-md px-3 py-6 text-sm transition-colors hover:bg-cyan-200 hover:text-primary"
                    } `}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-10 w-10" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {userData?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 flex-grow text-left">{userData?.name}</span>
              <ChevronUp className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            alignOffset={-8}
            className="w-[200px] p-2"
          >
            <DropdownMenuItem className="cursor-pointer">
              <User2 className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onClick={logOut}
            >
              <ChevronDown className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
