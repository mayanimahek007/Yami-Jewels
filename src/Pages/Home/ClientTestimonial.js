import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ClientTestimonial.css';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Regular Customer',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    text: 'The craftsmanship of Yami Jewels is exceptional. I purchased a diamond necklace for my anniversary and received countless compliments. The attention to detail is remarkable!',
    rating: 5
  },
  {
    id: 2,
    name: 'Raj Patel',
    role: 'First-time Buyer',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    text: 'I was hesitant about buying jewelry online, but Yami Jewels exceeded my expectations. The ring I purchased for my fiancée was even more beautiful in person than in the photos.',
    rating: 5
  },
  {
    id: 3,
    name: 'Meera Desai',
    role: 'Collector',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    text: 'As someone who collects fine jewelry, I can attest to the quality of Yami Jewels. Their pieces are timeless and the customer service is impeccable.',
    rating: 4
  },
  {
    id: 4,
    name: 'Arjun Mehta',
    role: 'Wedding Customer',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    text: 'We ordered our wedding rings from Yami Jewels and couldn\'t be happier. The customization options were exactly what we wanted, and the rings arrived well before our big day.',
    rating: 5
  },
  {
    id: 5,
    name: 'Ananya Singh',
    role: 'Gift Buyer',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    text: 'I bought a bracelet as a gift for my mother\'s birthday. The packaging was elegant, and she absolutely loved the design. Will definitely shop here again!',
    rating: 5
  },
  {
    id: 6,
    name: 'Vikram Joshi',
    role: 'Repeat Customer',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    text: 'I\'ve purchased several pieces from Yami Jewels over the years. Their quality is consistent, and their designs stay current while maintaining a timeless appeal.',
    rating: 4
  }
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ClientTestimonial = () => {
  return (
    <section className="client-testimonial bg-[#fdf8f8] from-amber-50 to-rose-50 py-4 pb-4">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-serif text-amber-800 mb-0">What Our Clients Say</h2>
        
        <Slider {...sliderSettings} className="testimonial-slider">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white h-[330px] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full mx-2 my-4">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-amber-300"
                  />
                  <div>
                    <h3 className="font-medium text-lg text-amber-900">{testimonial.name}</h3>
                    <p className="text-amber-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 italic flex-grow mb-4">"{testimonial.text}"</p>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ClientTestimonial;