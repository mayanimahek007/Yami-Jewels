import React from 'react';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';

const Footer = () => (
  <footer className="w-full bg-[#48182e] text-gray-100 pt-12 pb-4 mt-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
      {/* Brand & Newsletter */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <img src={require('../../assets/images/headerlogo.png')} alt="Yami Jewels Logo" className="w-full" />
          {/* <span className="text-xl font-bold font-playfair">Yami Jewels</span> */}
        </div>
        <p className="text-sm text-gray-200">Don’t miss any updates or promotions by signing up to our newsletter.</p>
        <form className="flex mt-2">
          <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l bg-gray-50 text-gray-900 focus:outline-none" />
          <button type="submit" className="px-4 bg-[#bfa14a] text-white rounded-r font-bold">&gt;</button>
        </form>
      </div>
      {/* Policies */}
      <div>
        <h4 className="font-semibold mb-3 text-lg">Our Policies</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-[#bfa14a]">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-[#bfa14a]">Refund Policy</a></li>
          <li><a href="#" className="hover:text-[#bfa14a]">Terms of Usage</a></li>
          <li><a href="#" className="hover:text-[#bfa14a]">Shipping Policy</a></li>
        </ul>
      </div>
      {/* Useful Links */}
      <div>
        <h4 className="font-semibold mb-3 text-lg">Useful Links</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-[#bfa14a]">About Us</a></li>
          <li><a href="#" className="hover:text-[#bfa14a]">Contact Us</a></li>
          <li><a href="#" className="hover:text-[#bfa14a]">Sitemap</a></li>
        </ul>
        <h4 className="font-semibold mt-5 mb-2 text-lg">Keep In Touch</h4>
        <div className="flex gap-4 mt-2">
          <a href="#" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaFacebook /></a>
          <a href="#" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaInstagram /></a>
          <a href="#" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaXTwitter /></a>
        </div>
      </div>
      {/* Contact Details */}
      <div>
        <h4 className="font-semibold mb-3 text-lg">Contact Details</h4>
        <ul className="space-y-2 text-sm">
          <li className='flex align-center'><span className="mr-2"><IoCall color='white' /></span>+91 9016905077</li>
          <li className='flex align-center'><span className="mr-2"><IoMdMail color='white' />
</span>care@yamijewels.com</li>
          <li className='flex align-center'><span className="mr-2"><MdLocationOn color='white' />
</span>301, 3rd Floor Ganesh Bhuvan Apartment, Main Road Varachha, Surat - 395006, Gujarat, India</li>
        </ul>
      </div>
    </div>
    {/* Divider */}
    <div className="max-w-7xl mx-auto border-t border-gray-700 mt-8 pt-4 flex flex-col items-center justify-between px-6">
      {/* Payment icons placeholder
      <div className="flex gap-3 mb-4 md:mb-0">
        <span className="bg-white rounded p-2"><img src="https://img.icons8.com/color/32/visa.png" alt="Visa" /></span>
        <span className="bg-white rounded p-2"><img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" /></span>
        <span className="bg-white rounded p-2"><img src="https://img.icons8.com/color/32/paypal.png" alt="Paypal" /></span>
      </div> */}
      <div className="text-xs text-gray-300 text-center">© {new Date().getFullYear()} Yami Jewels | All rights reserved</div>
      {/* App icons placeholder */}
      {/* <div className="flex gap-2">
        <a href="#"><img src="https://img.icons8.com/color/48/000000/apple-app-store.png" alt="App Store" className="h-8" /></a>
        <a href="#"><img src="https://img.icons8.com/color/48/000000/google-play.png" alt="Google Play" className="h-8" /></a>
      </div> */}
    </div>
  </footer>
);

export default Footer;
