import React from 'react';
import { Link } from 'react-router-dom';

const sampleBlogs = [
  { id: 1, title: 'The Art of Jewelry Making', excerpt: 'Discover the craftsmanship behind our exquisite pieces.' },
  { id: 2, title: 'Choosing the Perfect Gemstone', excerpt: 'Tips to select the gemstone that suits your style.' },
  { id: 3, title: 'Jewelry Care and Maintenance', excerpt: 'How to keep your jewelry sparkling for years.' },
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sampleBlogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
            <Link
              to={`/blogs/${blog.id}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read More &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
