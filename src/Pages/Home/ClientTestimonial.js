import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";

const ClientTestimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://194.238.18.43:5000/api/reviews");
        if (res.data?.data?.reviews) {
          setReviews(res.data.data.reviews);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-5 sm:py-16 bg-gradient-to-b from-white to-gray-50" id="testimonials">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-center text-gray-800 mb-5 md:mb-10">
          What Our Clients Say
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews available.</p>
        ) : (
          <Slider {...settings}>
            {reviews.map(({ _id, user, product, comment, rating, images }) => (
              <div key={_id} className="px-3 py-4">
                <div className="bg-white border rounded-2xl p-6 h-full flex flex-col items-center text-center transition">
                  
                  {/* Show user uploaded review image if available, otherwise product image */}
                  {images && images.length > 0 ? (
                    <img
                      src={`http://194.238.18.43:5000${images[0]}`}
                      alt={product?.name || "review"}
                      className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500 mb-4"
                    />
                  ) : product?.images?.length > 0 ? (
                    <img
                      src={`http://194.238.18.43:5000${product.images[0].url}`}
                      alt={product.images[0].alt}
                      className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500 mb-4"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-yellow-500 mb-4 flex items-center justify-center text-gray-500">
                      No Img
                    </div>
                  )}

                  <p className="text-gray-600 italic mb-4">"{comment}"</p>

                  {/* Star Ratings */}
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className="text-yellow-500">
                        {i < rating ? <FaStar /> : <FaStarHalfAlt className="opacity-30" />}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800">
                    {user?.name || "Anonymous"}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {product?.name || "Product"}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default ClientTestimonials;
