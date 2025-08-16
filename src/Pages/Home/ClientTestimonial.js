import React from "react";
import Slider from "react-slick";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "The craftsmanship of Yami Jewels is exceptional. I purchased a diamond necklace for my anniversary and received countless compliments. The attention to detail is remarkable!",
    rating: 5,
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "First-time Buyer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "I was hesitant about buying jewelry online, but Yami Jewels exceeded my expectations. The ring I purchased for my fiancée was even more beautiful in person than in the photos.",
    rating: 5,
  },
  {
    id: 3,
    name: "Meera Desai",
    role: "Collector",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "As someone who collects fine jewelry, I can attest to the quality of Yami Jewels. Their pieces are timeless and the customer service is impeccable.",
    rating: 4,
  },
  {
    id: 4,
    name: "Arjun Mehta",
    role: "Wedding Customer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    text: "We ordered our wedding rings from Yami Jewels and couldn't be happier. The customization options were exactly what we wanted, and the rings arrived well before our big day.",
    rating: 5,
  },
  {
    id: 5,
    name: "Ananya Singh",
    role: "Gift Buyer",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    text: "I bought a bracelet as a gift for my mother's birthday. The packaging was elegant, and she absolutely loved the design. Will definitely shop here again!",
    rating: 5,
  },
  {
    id: 6,
    name: "Vikram Joshi",
    role: "Repeat Customer",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    text: "I've purchased several pieces from Yami Jewels over the years. Their quality is consistent, and their designs stay current while maintaining a timeless appeal.",
    rating: 4,
  },
];

const ClientTestimonials = () => {
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
        <Slider {...settings}>
          {testimonials.map(({ id, name, role, image, text, rating }) => (
            <div key={id} className="px-3 py-4">
              <div className="bg-white border rounded-2xl p-6 h-full flex flex-col items-center text-center transition">
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500 mb-4"
                />
                <p className="text-gray-600 italic mb-4">"{text}"</p>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-yellow-500">
                      {i < rating ? <FaStar /> : <FaStarHalfAlt className="opacity-30" />}
                    </span>
                  ))}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                <span className="text-sm text-gray-500">{role}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ClientTestimonials;
