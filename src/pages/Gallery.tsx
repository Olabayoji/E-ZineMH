import React, { useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import img from "../assets/bg1.jpeg";
import img2 from "../assets/bg2.jpeg";
import img3 from "../assets/bg3.jpeg";
import img4 from "../assets/bg4.jpeg";
import img5 from "../assets/bg5.jpeg";

type Props = {};

const Gallery = (props: Props) => {
  const [index, setIndex] = useState(-1);
  const photos = [
    { src: img, width: 800, height: 650 },
    { src: img2, width: 800, height: 650 },
    { src: img3, width: 800, height: 650 },
    { src: img4, width: 800, height: 650 },
    { src: img5, width: 800, height: 650 },
  ];

  return (
    <div className="h-full mt-[64px] min-h-[90vh] px-4 md:px-8">
      <PhotoAlbum
        photos={photos}
        layout="rows"
        targetRowHeight={200}
        onClick={({ index }) => setIndex(index)}
        componentsProps={(containerWidth) => ({
          imageProps: {
            loading: (containerWidth || 0) > 600 ? "eager" : "lazy",
          },
        })}
      />
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
      />
    </div>
  );
};

export default Gallery;
