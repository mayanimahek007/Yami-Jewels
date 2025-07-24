import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedCollection.css';
import pear from '../../assets/images/pear.png';
import heart from '../../assets/images/heart.png';
import marquise from '../../assets/images/marquise.png';
import oval from '../../assets/images/oval.png';
import princess from '../../assets/images/princess.png';
import round from '../../assets/images/round.png';
import square from '../../assets/images/square.png';
import radiant from '../../assets/images/radiant.png';
import emerald from '../../assets/images/Emerald.png';
import cushion from '../../assets/images/cushion.png';

const items = [
  { id: 1, name: 'Pear', img: pear},
  { id: 2, name: 'Emerald', img: emerald},
  { id: 3, name: 'Heart', img: heart},
  { id: 3, name: 'Marquise', img: marquise },
  { id: 4, name: 'Oval', img: oval},
  { id: 5, name: 'Princess', img: princess},
  { id: 6, name: 'Round', img: round},
  { id: 7, name: 'Square', img: square},
  { id: 9, name: 'Radiant', img: radiant},
  { id: 10, name: 'Cushion', img: cushion},
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const FeaturedCollection = () => {
  return (
    <section className="featured-collection">
      <h2 className="fc-title">Diamond Collection</h2>
      <Slider {...sliderSettings} className="fc-slider">
        {items.map(item => (
          <div className="fc-card" key={item.id}>
            <img src={item.img} alt={item.name} className="fc-img" />
            <div className="fc-info">
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedCollection; 