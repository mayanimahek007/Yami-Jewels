import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import blogBanner from "../assets/images/contact (1).svg"; // Hero background

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for contacting us, ${formData.name}!`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Banner */}
      <div className="relative w-full">
        <img
          src={blogBanner}
          alt="About Us Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        {/* Contact Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="bg-white shadow rounded-lg p-8 text-center border hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <FiMail size={32} className="text-gray-800" />
            </div>
            <h3 className="text-lg font-semibold mb-2">EMAIL US</h3>
            <p className="text-gray-500 mb-4">info@yaamijewels.com</p>
            <a
              href="mailto:info@yaamijewels.com"
              className="inline-block px-6 py-2 border rounded-full hover:bg-gray-100"
            >
              Contact Us
            </a>
          </div>

          {/* Support Card */}
          <div className="bg-white shadow rounded-lg p-8 text-center border hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <FiPhone size={32} className="text-gray-800" />
            </div>
            <h3 className="text-lg font-semibold mb-4">SUPPORT</h3>
            <div className="flex flex-col gap-3 items-center">
              {/* India Number */}
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/918238626662"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={22} className="text-green-500" />
                </a>
                <a href="tel:+918238626662" className="text-gray-500 hover:underline">
                  +91 8238626662 (IND)
                </a>
              </div>
              {/* Hong Kong Number */}
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/85295614051"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={22} className="text-green-500" />
                </a>
                <a href="tel:+85295614051" className="text-gray-500 hover:underline">
                  +852 9561 4051 (HK)
                </a>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white shadow rounded-lg p-8 text-center border hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <FiMapPin size={32} className="text-gray-800" />
            </div>
            <h3 className="text-lg font-semibold mb-4">OUR OFFICES</h3>
            <p className="text-gray-500 text-sm">
              <strong>Krisha Ltd (HK):</strong> Unit 906, 9/F, Hart Avenue Plaza,
              5-9 Hart Avenue, Tsim Sha Tsui, Kowloon, Hong Kong.{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Unit+906,+9/F,+Hart+Avenue+Plaza,+5-9+Hart+Avenue,+Tsim+Sha+Tsui,+Kowloon,+Hong+Kong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Map
              </a>
            </p>
            <p className="text-gray-500 text-sm mt-3">
              <strong>Yaami Jewels (IND):</strong> A 506, RJD Business Hub, Opp.
              Naginavadi, Nr. Kiran Hospital, Katargam, Surat 395004 (Guj) India.{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=A+506,+RJD+Business+Hub,+Opp.+Naginavadi,+Nr.+Kiran+Hospital,+Katargam,+Surat+395004+(Guj)+India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Map
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-7xl mx-auto pt-12">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
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
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
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
    </>
  );
};

export default ContactUs;
