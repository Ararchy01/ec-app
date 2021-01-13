import React, { useState } from "react";
import Swiper from "react-id-swiper";
import NoImage from "../../assets/img/src/no_image.png";
import "swiper/css/swiper.css";

const ImageSwiper = (props) => {
  const [params] = useState({
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    convertflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    loop: true,
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length ? (
        images.map((image) => (
          <div className="p-media__thumb">
            <img src={image.path} alt="product" />
          </div>
        ))
      ) : (
        <div className="p-media__thumb">
          <img src={NoImage} alt="Nothing" />
        </div>
      )}
    </Swiper>
  );
};

export default ImageSwiper;
