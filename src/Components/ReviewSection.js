import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaUserCircle } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';

const ReviewSection = ({ productId, currentUser, onRatingUpdate }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return { average: 0, count: 0 };
    }
    
    const validReviews = reviews.filter(review => review && typeof review.rating === 'number');
    if (validReviews.length === 0) {
      return { average: 0, count: 0 };
    }
    
    const totalRating = validReviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / validReviews.length;
    
    return {
      average: Math.round(average * 10) / 10, // Round to 1 decimal place
      count: validReviews.length
    };
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/reviews/product/${productId}`);
        const data = await response.json();
        const fetchedReviews = data.data?.reviews || [];
        setReviews(fetchedReviews);

        // Calculate and pass rating data to parent
        const ratingData = calculateAverageRating(fetchedReviews);
        if (onRatingUpdate) {
          onRatingUpdate(ratingData);
        }
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, onRatingUpdate]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("product", productId);
      formData.append("rating", newReview.rating);
      formData.append("title", newReview.title);
      formData.append("comment", newReview.comment);
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      // ✅ Add to the top of the list, ensure array
      setReviews((prev) => [data.data.review, ...(Array.isArray(prev) ? prev : [])]);

      // ✅ Clear form + file input
      setNewReview({ rating: 5, title: "", comment: "", images: [] });
      setImageFiles([]);

      // ✅ Also clear the actual file input DOM value
      e.target.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }

    return stars;
  };

  if (loading) return <div className="text-center py-8">Loading reviews...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Review Display */}
      {reviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-semibold text-[#48182E] mb-6">Customer Reviews</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map(review => (
              <div 
                key={review._id} 
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">{renderStars(review.rating || 0)}</div>
                  <span className="text-sm text-gray-600">({review.rating || 0})</span>
                </div>
                <h4 className="font-semibold mb-2 text-lg">{review.title || 'No title'}</h4>
                <p className="text-sm text-gray-600 mb-4">{review.comment || 'No comment'}</p>
                <div className="flex items-center mb-2">
                  <FaUserCircle className="text-gray-400 mr-2 text-xl" />
                  <p className="text-xs text-gray-500">
                    {review.user?.name || 'Anonymous'} • {formatDate(review.createdAt)}
                  </p>
                </div>
                {review.images?.length > 0 && (
                  <div className="flex space-x-2 mt-2">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:5000${img?.url}`}
                        alt="Review"
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:scale-105 transition"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Form */}
      {currentUser && (
        <div className="mt-8">
          <h3 className="text-2xl font-serif font-semibold text-[#48182E] mb-4">Write a Review</h3>
          <form 
            onSubmit={handleSubmitReview} 
            className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
          >
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`text-2xl ${newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48182E]"
                placeholder="Review title"
                required
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48182E]"
                rows="4"
                placeholder="Your review"
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images (optional)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#48182E] text-white py-2 px-4 rounded-lg hover:bg-[#5a2a40] transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
