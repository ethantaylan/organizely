import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="footer p-5 rounded-xl bg-black text-neutral-content">

        <div className="text-md flex flex-col font-bold">
        <span className="footer-title text-slate-500 text-base mt-5">CONTACT</span>

          <a target="_blank" href="mailto: ethtaylan@gmail.com">
            Email
          </a>
          <a target="_blank" href="https://www.instagram.com/et.tln/">
            Instagram
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/ethan-taylan-697831199/"
          >
            LinkedIn
          </a>
          <a target="_blank" href="https://github.com/ethantaylan">
            GitHub
          </a>
        </div>
        <p className="text-right mt-10 text-slate-500 italic">Made with 💜 by @ethantaylan</p>

    </footer>
  );
};
