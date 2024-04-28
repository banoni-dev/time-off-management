import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LineChartIcon,
  MenuIcon,
  ShoppingBag,
  AreaChart,
  Calendar,
  User2Icon,
  LockIcon,
  BarChart2,
  Component,
  Settings,
  Table2Icon,
  FormInputIcon,
  HomeIcon,
  LampIcon,
  SignalHigh,
  AlertCircle,
  SwissFranc,
  MousePointerClick,
  UserPlus,
  UserMinus,
  Users,
  PersonStanding,
  UserCheck,
  UserCog,
  UserCircle,
  LogOut,
  PlusCircle,
  History,
  Clock,
  LayoutList,
  Pen,
} from "lucide-react";
import { useSidebar } from "./use-sidebar";
import { cn } from "@/app/libs/utlis";
import MenuItem from "./MenuItem";
import LinkItem from "./LinkItem";
import ExpandMenu from "./ExpandMenu";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        `absolute left-0 top-0 z-9999 flex h-screen w-20 flex-col overflow-y-hidden bg-black duration-300 ease-linear  dark:bg-boxdark lg:static lg:translate-x-0 `,
        {
          "w-70": isSidebarOpen,
        },
      )}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex w-full items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link className="flex items-center" href="/">
          
          {isSidebarOpen && (
            <h1 className=" ml-2 text-xl font-semibold text-white">
              Dashboard
            </h1>
          )}
        </Link>
        {isSidebarOpen && (
          <MenuIcon onClick={toggleSidebar} className="h-6 w-6" />
        )}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4  lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul
              className={cn("mb-6 flex flex-col  gap-1.5", {
                "items-center justify-center": !isSidebarOpen,
              })}
            >
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                  <LinkItem
                    icon={<HomeIcon className="  h-6 w-6 hover:text-white" />}
                    title="Stats"
                    href="/"
                  />
              </li>

              {/* <!-- HR --> */}

              <li>
                <LinkItem
                  title="List of Employees"
                  href="/employees/list"
                  icon={<Users className="h-6 w-6" />}
                />
              </li>



              {/* <!-- Employee --> */}

              <li>
                <LinkItem
                  title="Add a Time off"
                  href="/timeoff/add"
                  icon={<PlusCircle className="h-6 w-6" />}
                />
              </li>

              <li>
                <LinkItem
                  title="My Time Offs"
                  href="/timeoff/my"
                  icon={<Clock className="h-6 w-6" />}
                />
              </li>



              <li>
                <LinkItem
                  title="Hisotory"
                  href="/timeoff/history"
                  icon={<History className="h-6 w-6" />}
                />
              </li>

              <li>
                <LinkItem
                  title="Edit credits"
                  href="/credits/edit"
                  icon={<Pen className="h-6 w-6" />}
                />
              </li>

              {/* <!-- Admin --> */}
              <li>
                <ExpandMenu icon={<UserCircle className="h-6 w-6" />} name="Employees">
                  <LinkItem
                    title="List of Employees"
                    href="/employees/list"
                    icon={<Users className="h-5 w-5" />}
                  ></LinkItem>
                  <LinkItem
                    title="Add an Employee"
                    href="/employees/add"
                    icon={<UserPlus className="h-5 w-5" />}
                  />
                  <LinkItem
                    title="Delete an Employee"
                    href="/employees/delete"
                    icon={<UserMinus  className="h-5 w-5" />}
                  />
                </ExpandMenu>
              </li>
              <li>
                <ExpandMenu icon={<UserCheck className="h-6 w-6" />} name="Hrs">
                  <LinkItem
                    title="List of Hrs"
                    href="/hrs/list"
                    icon={<Users className="h-5 w-5" />}
                  ></LinkItem>
                  <LinkItem
                    title="Add an Hr"
                    href="/hrs/add"
                    icon={<UserPlus className="h-5 w-5" />}
                  />
                  <LinkItem
                    title="Delete an Hr"
                    href="/hrs/delete"
                    icon={<UserMinus  className="h-5 w-5" />}
                  />
                </ExpandMenu>
              </li>
              <li>
                <LinkItem 
                  title="Time offs"
                  href="/timeoff/edit"
                  icon={<LayoutList className="h-6 w-6" />}
                />
              </li>
              
              <li>
                <LinkItem
                  title="Settings"
                  href="/settings"
                  icon={<Settings className="h-6 w-6" />}
                ></LinkItem>
              </li>

              {/* <!-- Menu Item Settings --> */}
              <li>
                <LinkItem
                  title="Profile"
                  href="/profile"
                  icon={<User2Icon className="h-6 w-6" />}
                ></LinkItem>
              </li>

              <li>
                <LinkItem
                  title="Logout"
                  href="/logout"
                  icon={<LogOut className="h-6 w-6" />}
                ></LinkItem>
              </li>




              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
