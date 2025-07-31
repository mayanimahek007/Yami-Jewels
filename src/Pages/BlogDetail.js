import React from 'react';
import { useParams, Link } from 'react-router-dom';

const blogData = {
  1: {
    title: 'The Art of Jewelry Making',
    content: 'Jewelry making is a delicate art that requires skill, patience, and creativity. Our artisans pour their heart into every piece to ensure it is perfect for you.',
  },
  2: {
    title: 'Choosing the Perfect Gemstone',
    content: 'Selecting the right gemstone can be overwhelming. Consider your style, the occasion, and the meaning behind each stone to find your perfect match.',
  },
  3: {
    title: 'Jewelry Care and Maintenance',
    content: 'To keep your jewelry looking its best, clean it regularly, store it properly, and avoid exposure to harsh chemicals.',
  },
};

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData[id];

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link to="/blogs" className="text-indigo-600 hover:text-indigo-800">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <p className="text-gray-700 leading-relaxed">{blog.content}</p>
      <div className="mt-8">
        <Link to="/blogs" className="text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
