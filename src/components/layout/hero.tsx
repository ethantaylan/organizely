import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink } from "react-router-dom";
// import HeroBg from '../../assets/hero2.png'

export const Hero: React.FC = () => {
  const { user, loginWithRedirect } = useAuth0();

  return (
    <div
      // style={{ backgroundImage: `url(${HeroBg})`, backgroundSize: "cover" }}
      className="hero mt-5 py-10 rounded-2xl"
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="lg:text-7xl text-4xl text-white font-bold whitespace-nowrap">
            Hello there 👋
          </h1>
          <p className="py-6 text-xl">
            Organizely is your{" "}
            <span className="font-bold text-white">Ultimate Todo App!</span>{" "}
            <br />
            Master your tasks with ease and stay organized effortlessly. <br />{" "}
            <br />
            <span className="text-white font-bold">
              Let Organizely be your productivity partner!
            </span>
          </p>
          {user ? (
            <NavLink
              className="btn btn-secondary px-14 hover:bg-opacity-50 bg-opacity-25"
              to="/tasks"
            >
              My todos
            </NavLink>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="btn btn-secondary px-10 border-opacity-50 bg-opacity-10"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
