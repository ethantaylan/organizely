import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginButton from "../../../auth0/login-button";

export const Header: React.FC = () => {
  const { user, logout } = useAuth0();

  const navigate = useNavigate();

  return (
    <div className="navbar bg-slate-900 rounded-xl mb-5 flex justify-between text-primary-content">
      <div className="flex p-0 btn btn-ghost">
        <NavLink
          className="relative font-bold p-0 text-white normal-case text-xl"
          to="/"
        >
          ✌Organizely
          <span style={{ fontSize: 10 }} className="font-bold badge -right-12">
            BETA
          </span>
        </NavLink>
      </div>
      {!user ? (
        <LoginButton />
      ) : (
        <div className="flex-none rounded-2xl bg-opacity">
          {/* <NavLink className="m-5" to="/favorite-users">
            Favorite Users
          </NavLink>
          <NavLink to="/tasks">My Todos</NavLink> */}
          <span className="me-2 font-bold text-secondary">
            {user.given_name}
          </span>
          <div className="dropdown bg-slate-800 rounded-xl dropdown-end">
            <label tabIndex={0} className="btn flex btn-ghost avatar">
              <div className="w-8 border-secondary border-opacity-50 rounded-full">
                <img src={user?.picture} />
              </div>
              <ChevronDownIcon className="h-5 text-white" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52"
            >
              <li>
                <span
                  onClick={() => navigate("/tasks")}
                  className="justify-between"
                >
                  My todos
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate("/favorite-users")}
                  className="justify-between"
                >
                  Favorite users ⭐
                </span>
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
