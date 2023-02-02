import React, { useEffect, useState } from "react";
import Slide from "./Slide/Slide";
import "./Carousel.css";
import { slides } from "../../utils/appsConstants";

type Props = {};
const Carousel = (props: Props) => {
  const [timeduration] = useState(8000);
  const [play, setPlay] = useState(true);
  const [pos, setPos] = useState(0);
  const slidesrow = slides?.map((slide, i) => {
    return (
      <Slide
        key={i}
        className={`slide ${slide.class} ${
          pos % slides.length === i && "active"
        }`}
        slide={slide}
        pos={pos}
      />
    );
  });

  const [elap, setElap] = useState(0);
  useEffect(() => {
    setPos(0);
  }, []);
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    let elap: string | number | NodeJS.Timeout | undefined;
    if (play) {
      timer = setInterval(() => {
        setPos((prev) => prev + 1);
        setElap(0);
      }, timeduration);
      elap = setInterval(() => {
        setElap((prev) => prev + 1);
      }, 1);
    } else {
      clearInterval(timer);
      clearInterval(elap);
      setElap(0);
    }
    return () => {
      clearInterval(timer);
      clearInterval(elap);
      setElap(0);
    };
  }, [play, timeduration]);

  return (
    <div className="carouselbanner">
      <div className="slides">{slidesrow}</div>
    </div>
  );
};
export default Carousel;
