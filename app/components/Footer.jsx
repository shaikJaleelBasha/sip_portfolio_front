import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-4">

        {/* Logo + About */}
        <div>
          <img
            src="https://www.kfintech.com/new-assets/images/logo-shape.svg"
            alt="KFintech"
            className="mb-6 w-52"
          />

          <p className="text-[17px] leading-9 text-gray-400">
            KFintech provides innovative financial technology solutions for
            asset managers, investors, and enterprises with secure and scalable
            digital platforms.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-white">
            About Us
          </h2>

          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-cyan-400">
              About KFintech
            </li>
            <li className="cursor-pointer hover:text-cyan-400">
              Careers
            </li>
            <li className="cursor-pointer hover:text-cyan-400">
              Contact Us
            </li>
            <li className="cursor-pointer hover:text-cyan-400">
              Investor Relations
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Solutions
          </h2>

          <ul className="space-y-4">
            <li className="hover:text-cyan-400">Mutual Fund Solutions</li>
            <li className="hover:text-cyan-400">Corporate Registry</li>
            <li className="hover:text-cyan-400">Pension Solutions</li>
            <li className="hover:text-cyan-400">Investor Services</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Get In Touch
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-cyan-400" />
              <p>+91 40 6716 2222</p>
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-cyan-400" />
              <p>91000 94099</p>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail className="text-cyan-400" />
              <p>support@kfintech.com</p>
            </div>

          </div>

          {/* Social Icons */}
          <div className="mt-8 flex gap-4">
            <div className="rounded-full bg-gray-800 p-3 hover:bg-cyan-500">
              <FaInstagram />
            </div>

            <div className="rounded-full bg-gray-800 p-3 hover:bg-cyan-500">
              <FaFacebookF />
            </div>

            <div className="rounded-full bg-gray-800 p-3 hover:bg-cyan-500">
              <FaLinkedinIn />
            </div>

            <div className="rounded-full bg-gray-800 p-3 hover:bg-cyan-500">
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © 2026 KFintech. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;