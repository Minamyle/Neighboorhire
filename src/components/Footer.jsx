import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-20 bg-[#ffb012]">
      <div className="flex flex-col justify-center items-center">
        <ul className="flex gap-8 mb-10">
          <a href="">
            <li>Privacy Policy</li>
          </a>
          <a href="">
            <li>Terms of Service</li>
          </a>
          <a href="">
            <li>Help Center</li>
          </a>
        </ul>
        <div className="flex flex-row gap-8 mb-10">
          <img
            src="/images/earth-with-continents.png"
            alt="earth"
            className="w-7 h-7"
          />
          <img src="/images/share.png" alt="share" className="w-7 h-7" />
          <img src="/images/mail.png" alt="mail" className="w-7 h-7" />
        </div>
        <p className="text-center text-sm text-black py-4">
          © {new Date().getFullYear()} NeighborHire. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
