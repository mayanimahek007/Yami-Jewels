import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for contacting us, ${formData.name}!`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>

        {/* Contact Information */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center mb-16">
          {/* Phone */}
          <div className="flex flex-col items-center px-6 mb-10 md:mb-0">
            <div className="bg-[#48182e47] text-white p-4 rounded-full mb-4">
              <FiPhone size={28} color="#48182E" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Phone Number</h3>
            <a href="tel:+919081139039" className="text-teal-700 hover:underline">
              +91 90811 39039
            </a>
          </div>

          {/* Divider 1 */}
          <div className="hidden md:flex items-center justify-center w-2">
            <div className="w-px h-16 bg-gray-300"></div>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center px-6 mb-10 md:mb-0">
            <div className="bg-[#48182e47] text-white p-4 rounded-full mb-4">
              <FiMail size={28} color="#48182E" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Address</h3>
            <a href="mailto:crystovajewels@gmail.com" className="text-teal-700 hover:underline">
              crystovajewels@gmail.com
            </a>
          </div>

          {/* Divider 2 */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-px h-16 bg-gray-300"></div>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center px-6">
            <div className="bg-[#48182e47] text-white p-4 rounded-full mb-4">
              <FiMapPin size={28} color="#48182E" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Office Address</h3>
            <p className="text-sm text-gray-700">
              B-714 IT Park, Opp. AR Mall,<br />
              Mota Varachha, Surat - 394101
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#e2c17c] to-[#bfa14a] text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
