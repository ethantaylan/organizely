import React from "react";
import { NavLink } from "react-router-dom";

export const Hero: React.FC = () => {
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
          <NavLink to="/tasks">
            <button className="btn btn-secondary">Get Started</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
