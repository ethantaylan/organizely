import { HomeIcon, PaperClipIcon, StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";

export interface BottomNavigationProps {}

export interface BottomNav {
  to: string;
  label: string;
  icon: React.ReactElement;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = () => {
  const navs: BottomNav[] = [
    {
      label: "Home",
      to: "/",
      icon: <HomeIcon className="w-5" />,
    },
    {
      label: "Todos",
      to: "/tasks",
      icon: <PaperClipIcon className="w-5" />,
    },
    {
      label: "Favorite users",
      to: "/favorite-users",
      icon: <StarIcon className="w-5" />,
    },
  ];

  return (
    <div className="btm-nav btm-nav-md border-t border-t-slate-800 bg-black bg-opacity-60 backdrop-blur-md">
      <div className="relative items-center flex-row flex w-full justify-around">
        {/* <span className="fixed bottom-14 right-0 bg-black rounded text-secondary " style={{ zIndex: 999 }}>
          <ChevronDownIcon className="w-6" />
        </span> */}

        {navs.map((nav) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-secondary flex flex-col justify-center items-center text-center w-full"
                : "text-slate-700 flex flex-col justify-center items-center text-center w-full"
            }
            to={nav.to}
          >
            {nav.icon}
            <span className="btm-nav-label w-full">{nav.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
