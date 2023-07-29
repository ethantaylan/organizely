import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "../../../auth0/login-button";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <div className="navbar p-0 text-primary-content">
      <div className="flex-1">
        <NavLink
          className="font-black btn btn-ghost p-0 text-white normal-case text-xl"
          to="/"
        >
          ✌Organizely
        </NavLink>
      </div>
      {!user ? (
        <LoginButton />
      ) : (
        <div className="flex-none">
          <span className="me-2 font-black text-secondary">
            {user.given_name}
          </span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 border-2 border-secondary rounded-full">
                <img src={user?.picture} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={() => logout()}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
