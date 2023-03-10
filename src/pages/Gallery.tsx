import { deleteObject, getDownloadURL, listAll, ref } from "@firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import img from "../assets/bg1.jpeg";
import img2 from "../assets/bg2.jpeg";
import img3 from "../assets/bg3.jpeg";
import img4 from "../assets/bg4.jpeg";
import img5 from "../assets/bg5.jpeg";
import Images from "../components/Images";
import Toast from "../components/UI/Toast";
import { storage } from "../utils/firbase";

type Props = {};

const Gallery = (props: Props) => {
  const [index, setIndex] = useState(-1);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const [deleting, setDeleting] = useState(false);
  const [photos, setPhotos] = useState<
    { src: string; caption: string; id: string }[]
  >([]);

  const effectRan = useRef(false);

  const imageListRef = ref(storage, "images/");

  // get images handler
  const getImages = async () => {
    try {
      const images = await listAll(imageListRef);

      if (images) {
        images.items.forEach((image) => {
          getDownloadURL(image)
            .then((url) => {
              setPhotos((prev) => [
                ...prev,
                {
                  src: url,
                  caption: image.name.split("_")[0].replace(/-/g, " "),
                  id: image.fullPath,
                },
              ]);
            })
            .catch((error) => {
              setError("Error occurred");
            });
        });
      } else {
        setError("Error getting images");
      }
    } catch (error: any) {
      setError("Error getting images");
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      window.scrollTo(0, 0);
      getImages();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  const deleteHandler = (id: string, index: number) => {
    const imageRef = ref(storage, id);
    // Send delete request
    setDeleting(true);
    deleteObject(imageRef)
      .then(() => {
        setSuccess("Image removed successfully");
        // Filter the deleted photo out
        setPhotos(photos.filter((photo) => photo.id !== id));
      })
      .catch((error) => {
        setError(error);
      });
    setDeleting(false);
  };

  return (
    <div className="h-full mt-[64px] min-h-[90vh] px-4 md:px-8">
      <div className="wrap">
        {photos.map((img, index) => (
          <div key={img.src} className="box">
            {photos && (
              <Images
                onClick={() => setIndex(index)}
                src={img.src}
                caption={img.caption}
                id={img.id}
                deleting={deleting}
                delete={() => deleteHandler(img.id, index)}
              />
            )}
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
      />
      {(!!error || !!success) && (
        <Toast
          message={error ? "An error occurred" : success!}
          close={() => {
            setError(null);
            setSuccess(null);
          }}
          success={!!success}
        />
      )}
    </div>
  );
};

export default Gallery;
