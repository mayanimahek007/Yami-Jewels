import React, { useState, useEffect } from 'react';
import './ChooseTypeSection.css';
import imgVideo from '../../assets/videos/ring.mp4';
import imgVideo2 from '../../assets/videos/bracelate.mp4';
import imgVideo3 from '../../assets/videos/pendant.mp4';
import imgVideo4 from '../../assets/videos/pendant1.mp4';
import imgRing from '../../assets/images/ring.jpg';
import imgNecklace from '../../assets/images/earring.jpg';
import imgBracelet from '../../assets/images/bracelets.jpg';
import { FaCircleArrowRight } from "react-icons/fa6";

const videoList = [imgVideo, imgVideo2, imgVideo3, imgVideo4];

const ChooseTypeSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videoList.length);
  };

  return (
    <section className="choose-type-section">
      <div className="cts-left">
        <div className="cts-video-wrapper">
          <video
            src={videoList[currentVideo]}
            className="cts-video-img"
            autoPlay
            muted
            playsInline
            controlsList="nodownload"
            onEnded={handleVideoEnd}
          />
          <div className="cts-slider-dots cts-slider-dots-on-video">
            {videoList.map((_, idx) => (
              <span
                key={idx}
                className={`cts-dot${currentVideo === idx ? ' active' : ''}`}
                onClick={() => setCurrentVideo(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="cts-right">
        <div className="cts-right-content">
          <h2 className="cts-title">Choose The Type!</h2>
          <p className="cts-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo.
          </p>
        </div>
        <div className="cts-cards">
          <div className="cts-card" onClick={() => window.location.href = '/product?category=ring'}>
            <img src={imgRing} alt="Ring" className="cts-card-img" />
            <div className="cts-card-label">Ring</div>
            <FaCircleArrowRight size={28} fill="#B47B48" />
          </div>
          <div className="cts-card" onClick={() => window.location.href = '/product?category=earring'}>
            <img src={imgNecklace} alt="Earring" className="cts-card-img" />
            <div className="cts-card-label">Earring</div>
            <FaCircleArrowRight size={28} fill="#B47B48" />
          </div>
          <div className="cts-card" onClick={() => window.location.href = '/product?category=bracelet'}>
            <img src={imgBracelet} alt="Bracelet" className="cts-card-img" />
            <div className="cts-card-label">Bracelet</div>
            <FaCircleArrowRight size={28} fill="#B47B48" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default ChooseTypeSection;
