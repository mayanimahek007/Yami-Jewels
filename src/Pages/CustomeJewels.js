import React, { useState, useRef } from "react";
import custom from "../assets/images/webp/Custom.webp";

const CustomJewels = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    type: "",
    budget: "",
    metalType: "",
    file: null,
    description: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "919099975424";
    const message = `
*New Custom Jewelery Request*

*Name:* ${formData.name}
*Mobile:* ${formData.mobile}
*Email:* ${formData.email}
*Type:* ${formData.type}
*Budget:* ${formData.budget}
*Metal Type:* ${formData.metalType}
*Description:* ${formData.description}
    `;
    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setFormData({
      name: "",
      mobile: "",
      email: "",
      type: "",
      budget: "",
      metalType: "",
      file: null,
      description: "",
    });
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Banner */}
      <img
        src={custom}
        alt="Custom Jewelery"
        className="w-full object-cover"
      />

      {/* Form Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">
            Designed by You, Crafted by Us
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Create a unique piece of Jewelery that reflects your personal style.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-[#e2c17c]/30"
          >
            {/* Name & Mobile */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e2c17c] focus:border-[#e2c17c] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Mobile Number*
                </label>
                <input
                  type="text"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e2c17c] focus:border-[#e2c17c] outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e2c17c] focus:border-[#e2c17c] outline-none transition"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Jewelery Type*
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-[#e2c17c] focus:border-[#e2c17c] outline-none transition"
              >
                <option value="">Choose Type</option>
                <option value="Ring">Ring</option>
                <option value="Necklace">Necklace</option>
                <option value="Bracelet">Bracelet</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Budget & Metal Type */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Total Budget
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e2c17c] focus:border-[#e2c17c] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Metal Type
                </label>
                <input
                  type="text"
                  name="metalType"
                  value={formData.metalType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e2c17c] focus:border-[#e2c17c] outline-none transition"
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Upload Reference File
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                ref={fileInputRef}
                accept=".pdf,.jpg,.png,.jpeg,.doc,.docx"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Allowed types: pdf, jpg, png, jpeg, doc, docx.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Please describe your idea..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e2c17c] focus:border-[#e2c17c] outline-none transition"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-[#e2c17c] to-[#bfa14a] hover:opacity-90 transition-transform transform hover:scale-[1.02]"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomJewels;
