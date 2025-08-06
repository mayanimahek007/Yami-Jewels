import React from 'react';
import { Link } from 'react-router-dom';
import shopbanner from '../assets/images/blogs.svg';
import b1 from '../assets/images/b1.webp';
import b2 from '../assets/images/b2.webp';
import b3 from '../assets/images/b3.webp';
import b4 from '../assets/images/b4.webp';
import b5 from '../assets/images/b5.webp';
import b6 from '../assets/images/b6.webp';

const sampleBlogs = [
  {
    id: 1,
    title: 'The Art of Jewelry Making',
    excerpt: 'Discover the craftsmanship behind our exquisite pieces.',
    image: b1,
  },
  {
    id: 2,
    title: 'Choosing the Perfect Gemstone',
    excerpt: 'Tips to select the gemstone that suits your style.',
    image: b2,
  },
  {
    id: 3,
    title: 'Jewelry Care and Maintenance',
    excerpt: 'How to keep your jewelry sparkling for years.',
    image:b3,
  },
  {
    id: 4,
    title: 'Latest Trends in Bridal Jewelry',
    excerpt: 'Explore trending styles for the modern bride.',
    image: b4,
  },
  {
    id: 5,
    title: 'Understanding Birthstones',
    excerpt: 'Know the meaning and value of your birthstone.',
    image: b5,
  },
  {
    id: 6,
    title: 'Vintage Jewelry: A Timeless Choice',
    excerpt: 'Why vintage designs never go out of style.',
    image:b6,
  },
];

const Blogs = () => {
  return (
    <>
    <div className="w-full h-[300px] sm:h-[400px] md:h-[400px]">

    <img
        src={shopbanner}
        alt="Banner"
        className="w-full h-full object-cover"
      />
      </div>
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-montserrat text-[#47182E]">All Collections</h1>
      </div> */}
      {/* <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1> */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {sampleBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              </div>
              <Link
                to={`/blog-detail/${blog.id}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium mt-auto"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Blogs;
