import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="footer rounded-xl bg-black mt-10 p-10 text-neutral-content">
      <div className="flex flex-col">
        <p className="text-2xl font-bold">Made with 💜 by @ethantaylan</p>
      </div>

      <div>
        <span className="footer-title mt-10">CONTACT</span>

        <div className="text-2xl flex flex-col font-bold">
          <a target="_blank" href="https://www.instagram.com/et.tln/">
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
        </div>
      </div>
    </footer>
  );
};
