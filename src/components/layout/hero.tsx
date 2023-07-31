import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink } from "react-router-dom";

export const Hero: React.FC = () => {
  const { user, loginWithRedirect } = useAuth0();

  console.log(!!user)

  return (
    <div className="hero mt-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl text-white font-bold">Hello there 👋</h1>
          <p className="py-6">
            Organizely is your{" "}
            <span className="font-bold">Ultimate Todo App!</span> <br />
            Master your tasks with ease and stay organized effortlessly. <br />{" "}
            <br />
            <span className="text-white">
              Let Organizely be your productivity partner!
            </span>
          </p>
          {user ? (
            <NavLink className="btn btn-secondary" to="/tasks">
              My todos
            </NavLink>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="btn btn-secondary"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
