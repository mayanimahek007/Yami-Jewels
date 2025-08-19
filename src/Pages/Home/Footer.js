import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';

const Footer = () => {
  const [showInstaLinks, setShowInstaLinks] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const instaLinks = [
    { label: " MFGDIAMOND", url: "https://www.instagram.com/mfgdiamond/" },
    { label: "YAAMI JEWELS", url: "https://www.instagram.com/yaami_jewels/" }
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("http://194.238.18.43:5000/api/news/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      setStatus("❌ Failed to send email");
    }
  };

  return (
    <footer className="w-full bg-[#48182e] text-gray-100 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">

        {/* Brand & Newsletter */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2 ">
            <img src={require('../../assets/images/headerlogo2.png')} alt="Yaami Jewels Logo" className="lg:w-60 sm:w-40 w-[250px]" />
          </div>
          <p className="text-sm text-gray-200">Don’t miss any updates or promotions by signing up to our newsletter.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l bg-gray-50 text-gray-900 focus:outline-none"
              required
            />
            <button type="submit" className="px-4 bg-[#bfa14a] text-white rounded-r font-bold">&gt;</button>
          </form>
          {status && <p className="text-xs mt-1">{status}</p>}
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Our Policies</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy-policy" className="hover:text-[#bfa14a]">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions" className="hover:text-[#bfa14a]">Terms and Conditions</a></li>
            <li><a href="/return-exchange-cancellation-policy" className="hover:text-[#bfa14a]">Return, Exchange & Cancellation Policy</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/product" className="hover:text-[#bfa14a]">Shop</a></li>
            <li><a href="/about-us" className="hover:text-[#bfa14a]">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-[#bfa14a]">Contact Us</a></li>
            <li><a href="/blogs" className="hover:text-[#bfa14a]">Blogs</a></li>
            <li><a href="/sitemap" className="hover:text-[#bfa14a]">Sitemap</a></li>
          </ul>

          {/* Keep In Touch (Desktop) */}
          <div className='hidden sm:block relative'>
            <h4 className="font-semibold mt-5 mb-2 text-lg">Keep In Touch</h4>
            {showInstaLinks && (
              <div className="absolute left-0 bottom-full mb-2 w-64 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200 z-50">
                {instaLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="block px-4 py-2 hover:bg-[#bfa14a] hover:text-white transition"
                    onClick={() => setShowInstaLinks(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com/MFGDIAMOND" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaFacebook /></a>
              <button onClick={() => setShowInstaLinks((prev) => !prev)} className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaInstagram /></button>
              <a href="https://www.pinterest.com/krishahklimited/" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaPinterest /></a>
              <a href="https://wa.me/85295614051" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Contact Details</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://wa.me/918238626662" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#bfa14a]">
                <FaWhatsapp className="mr-2" /> +91 8238626662 (IND)
              </a>
            </li>
            <li>
              <a href="https://wa.me/85295614051" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#bfa14a]">
                <FaWhatsapp className="mr-2" /> +852 9561 4051 (HK)
              </a>
            </li>
            <li>
              <a href="mailto:info@yaamijewels.com" className="flex items-center hover:text-[#bfa14a]">
                <IoMdMail className="mr-2" /> info@yaamijewels.com
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps?q=A+506,+RJD+Business+Hub,+Opp.+Naginavadi,+Nr.+Kiran+Hospital,+Katargam,+Surat+395004+(Guj)+INDIA" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[#bfa14a]">
                <MdLocationOn className="mr-2 mt-1" /> A 506, RJD Business Hub, Opp. Naginavadi, Nr. Kiran Hospital, Katargam, Surat 395004 (Guj) INDIA.
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps?q=Unit+906,+9/F,+Hart+Avenue+Plaza,+5-9+Hart+Avenue,+Tsim+Sha+Tsui+Kowloon,+Hong+Kong" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[#bfa14a]">
                <MdLocationOn className="mr-2 mt-1" /> Unit 906, 9/F, Hart Avenue Plaza, 5-9 Hart Avenue, Tsim Sha Tsui Kowloon, Hong Kong.
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Keep In Touch */}
      <div className="block sm:hidden flex flex-col items-center mx-auto px-6 mt-8 relative">
        <h4 className="font-semibold mt-5 mb-2 text-lg">Keep In Touch</h4>
        {showInstaLinks && (
          <div className="absolute bottom-full mb-2 w-64 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200 z-50">
            {instaLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-[#bfa14a] hover:text-white transition"
                onClick={() => setShowInstaLinks(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        <div className="flex gap-4 mt-2">
          <a href="https://www.facebook.com/MFGDIAMOND" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaFacebook /></a>
          <button onClick={() => setShowInstaLinks((prev) => !prev)} className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaInstagram /></button>
          <a href="https://www.pinterest.com/krishahklimited/" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaPinterest /></a>
          <a href="https://wa.me/85295614051" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-2 hover:bg-[#bfa14a] transition"><FaWhatsapp /></a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 mt-8 pt-4 flex flex-col items-center justify-between px-6">
        <div className="text-xs text-gray-300 text-center">© {new Date().getFullYear()} Yaami Jewels | All rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
