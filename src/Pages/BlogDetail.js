import React, { useState } from 'react';
import featuredImg from '../assets/images/b1.webp'; // Replace with your actual image path
import blogBanner from '../assets/images/webp/blogDetails.webp';
import authorImg from '../assets/images/b2.webp';
import subsri from '../assets/images/webp/subsri.webp';
import './Home/Unique.css';

const BlogDetail = () => {

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

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
    <div>
      {/* Header Section */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <img src={blogBanner} alt="Blog Banner" className="w-full h-full object-cover" />

      </div>

      {/* Blog Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Blog Content */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 leading-snug">
            Behind the Scenes: The Art of Jewelry Making and Designing
          </h1>

          <img src={featuredImg} alt="Featured" className="w-full rounded-lg" />

          <section>
            <h2 className="text-2xl font-semibold my-4">Introduction:</h2>
            <p className="text-gray-700 leading-relaxed">
              Jewelry has been a symbol of adornment and personal expression for centuries.
              From ancient civilizations to modern fashion runways, the art of jewelry
              making has evolved while preserving its core essence of beauty and craftsmanship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold my-4">Design Inspiration and Sketching:</h2>
            <p className="text-gray-700 leading-relaxed">
              The journey of jewelry making begins with a spark of inspiration. Designers
              draw from nature, culture, and personal experiences to sketch their ideas. This
              phase involves translating abstract concepts into tangible designs, focusing on
              balance, proportion, and wearability.
            </p>
          </section>

          <section className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-500 my-6">
            <p className="text-sm text-gray-800">
              Choosing the right materials is crucial. From selecting precious metals like
              gold and platinum to picking the perfect gemstones, each element contributes to
              the uniqueness and value of the final piece.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold my-4">Craftsmanship and Setting:</h2>
            <p className="text-gray-700 leading-relaxed">
              Skilled artisans meticulously shape metals, set stones, and polish surfaces to
              perfection. Techniques like wax carving, casting, and hand setting require years
              of experience and an eye for detail. The result is a piece that not only looks
              beautiful but also tells a story.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion:</h2>
            <p className="text-gray-700">
              The art of jewelry making is a harmonious blend of creativity and precision. Every
              piece reflects the passion and dedication of its creators, making jewelry not just
              an accessory, but a legacy.
            </p>
          </section>
        </div>

        {/* Author Sidebar */}
        {/* Author Sidebar (Sticky) */}
        <div className="relative">
          <div className="sticky top-40 bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={authorImg}
              alt="Author"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-500 mb-4">Blog Author</p>
            <p className="text-gray-600 text-sm">
              John is a master artisan with over 15 years of experience in jewelry design and
              production. His work is featured in top fashion shows and private collections.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <a href="#"><i className="fab fa-facebook-f text-blue-600"></i></a>
              <a href="#"><i className="fab fa-twitter text-blue-400"></i></a>
              <a href="#"><i className="fab fa-instagram text-pink-500"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {/* <div className="relative bg-[#48182ec4] text-white py-20 text-center px-4 bg-cover bg-center flex h-[300px]" style={{ backgroundImage: `url(${subsri}` }}>

       <div className='flex flex-col items-center docccc'>
        <h2 className="text-3xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-gray-300">Be the first to know about new collections and exclusive offers.</p>
       </div>
        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="email"
            placeholder="Email Address"
            className="newsletter-form-input px-4 py-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#AE8B0D] focus:border-transparent placeholder-white"
          />
          <button
            type="submit"
            className="newsletter-submit-button w-button"
          >
            Subscribe
          </button>
          
        </form>
        
      </div> */}
      <div
        className="relative text-white py-20 px-4 bg-cover bg-center flex flex-col justify-center items-center h-[380px]"
        style={{ backgroundImage: `url(${subsri})` }}
      >
        <div className="text-center max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-sm md:text-base text-gray-300 mb-6">Be the first to know about new collections and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-between">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#AE8B0D] outline-none"
            />
            <button
              type="submit"
              className="bg-[#AE8B0D] text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
            >
              Subscribe
            </button>
          </form>
          {status && <p className="text-xs mt-1">{status}</p>}

        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
