import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginButton from "../../../components/auth0/login-button";

export const Header: React.FC = () => {
  const { user, logout } = useAuth0();

  const navigate = useNavigate();

  return (
    <div className="navbar bg-slate-900 mb-5 rounded-xl flex justify-between text-primary-content">
      <div className="flex p-0 btn btn-ghost">
        <NavLink
          className="relative font-bold p-0 text-slate-300 normal-case text-xl"
          to="/"
        >
          ✌Organizely
          <span
            style={{ fontSize: 10 }}
            className="font-bold absolute text-secondary -right-7"
          >
            BETA
          </span>
        </NavLink>
      </div>
      {!user ? (
        <LoginButton />
      ) : (
        <div className="flex-none rounded-2xl bg-opacity">
          <div className="dropdown bg-slate-800 rounded-xl dropdown-end">
            <label tabIndex={0} className="btn flex btn-ghost avatar">
              <div className="w-8 border-secondary border-opacity-50 rounded-full">
                <img src={user?.picture} />
              </div>
              <span className="text-slate-400">MENU</span>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content font-semibold mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52"
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
