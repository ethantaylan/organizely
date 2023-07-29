import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "../../../auth0/login-button";

export const Header: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <div className="navbar text-primary-content bg-primary">
      
      <div className="flex-1">
        <a className="btn btn-ghost text-white normal-case text-xl">
          DAISY <span className="text-sm text-secondary font-black">TODOS</span>
        </a>
      </div>
      {!user ? (
        <button className="btn btn-ghost btn-square">
          <LoginButton />
        </button>
      ) : (
        <div className="flex-none">
          <span className="me-2">{user.name}</span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
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
