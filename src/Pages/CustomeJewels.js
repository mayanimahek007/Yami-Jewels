import React, { useState, useRef } from "react";
import custom from '../assets/images/custome.svg'; // Update with your actual banner image path
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

  const fileInputRef = useRef(null); // 👈 Ref for the file input

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
*New Custom Jewellery Request*

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

    // Clear file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Reset form state
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
      <div className="w-full">
        <img
        src={custom}
          alt="Custom Jewellery"
          className="w-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">
            Designed by You, Crafted by Us
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Create a unique piece of jewellery that reflects your personal style.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-xl shadow-md"
          >
            {/* Name & Mobile */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number*"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />

            {/* Type Dropdown */}
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Choose Type</option>
              <option value="Ring">Ring</option>
              <option value="Necklace">Necklace</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Other">Other</option>
            </select>

            {/* Budget & Metal Type */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="number"
                name="budget"
                placeholder="Total Budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="metalType"
                placeholder="Metal Type"
                value={formData.metalType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* File Upload */}
            <input
              type="file"
              name="file"
              onChange={handleChange}
              ref={fileInputRef} // 👈 attach ref
              accept=".pdf,.jpg,.png,.jpeg,.doc,.docx"
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Allowed types: pdf, jpg, png, jpeg, doc, docx.
            </p>

            {/* Description */}
            <textarea
              name="description"
              placeholder="Please describe your idea..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border rounded"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomJewels;
