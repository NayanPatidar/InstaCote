import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {sidebarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.label}
            className={`leftsidebar-link group ${
              isActive && "bg-primary-500 rounder-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <NavLink to={link.route} className="flex gap-4 items-center p-4">
              <img
                src={link.imgURL}
                alt={link.label}
                className={`group-hover:invert-white ${
                  isActive && "invert-white"
                }`}
              ></img>
              {link.label}
            </NavLink>
          </li>
        );
      })}
    </section>
  );
};

export default Bottombar;
