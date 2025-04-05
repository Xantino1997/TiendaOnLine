import React, { useEffect, useState } from 'react';
import '../css/Slider.css';

import img1 from '../images/persona3.png';
import img2 from '../images/persona2.png';
import img3 from '../images/persona1.png';

const images = [img1, img2, img3];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
    <div className="slider-text">
    <h2>Shows en Vivo</h2>
    <p>Espectáculos • Música • Tu mejor opción</p>
  </div>
    <div className="slider">
      <img
        src={images[index]}
        alt={`slide-${index}`}
        className="slider-image"
      />
    </div></div>
    
  );
};

export default Slider;
