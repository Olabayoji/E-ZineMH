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
  const [gallery1Index, setGallery1Index] = useState(-1);
  const [gallery2Index, setGallery2Index] = useState(-1);
  const [gallery3Index, setGallery3Index] = useState(-1);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const [deleting, setDeleting] = useState(false);
  const [photos1, setPhotos1] = useState<
    { src: string; caption: string; id: string }[]
  >([]);
  const [photos2, setPhotos2] = useState<
    { src: string; caption: string; id: string }[]
  >([]);
  const [photos3, setPhoto3] = useState<
    { src: string; caption: string; id: string }[]
  >([]);

  const effectRan = useRef(false);

  const gallery1Ref = ref(storage, "images/what-is-climate-change/");
  const gallery2Ref = ref(storage, "images/how-did-climate-change-happen/");
  const gallery3Ref = ref(
    storage,
    "images/how-can-we-help-using-mothers-mental-health/"
  );

  // get images handler
  const getImages = async (imageListRef: any, url: string) => {
    try {
      const images = await listAll(imageListRef);

      if (images) {
        switch (url) {
          case "images/what-is-climate-change/":
            images.items.forEach((image) => {
              getDownloadURL(image)
                .then((url) => {
                  setPhotos1((prev) => [
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
            break;
          case "images/how-did-climate-change-happen":
            images.items.forEach((image) => {
              getDownloadURL(image)
                .then((url) => {
                  setPhotos2((prev) => [
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
            break;
          case "images/how-can-we-help-using-mothers-mental-health":
            images.items.forEach((image) => {
              getDownloadURL(image)
                .then((url) => {
                  setPhoto3((prev) => [
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
            break;

          default:
            break;
        }
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
      getImages(gallery1Ref, "images/what-is-climate-change/"); //get images in first section
      getImages(gallery2Ref, "images/how-did-climate-change-happen"); // get images in second section
      getImages(
        gallery3Ref,
        "images/how-can-we-help-using-mothers-mental-health"
      ); //get images in third section
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
        setPhotos1(photos1.filter((photo) => photo.id !== id));
      })
      .catch((error) => {
        setError(error);
      });
    setDeleting(false);
  };

  return (
    <div className="h-full mt-[64px] min-h-[90vh] px-4 md:px-8">
      {photos1.length > 0 && (
        <section className="wrap">
          <h2 className="text-lg font-semibold capitalize">
            What is climate change?{" "}
          </h2>
          {photos1.map((img, index) => (
            <div key={img.src} className="box">
              <Images
                onClick={() => setGallery1Index(index)}
                src={img.src}
                caption={img.caption}
                id={img.id}
                deleting={deleting}
                delete={() => deleteHandler(img.id, index)}
              />
            </div>
          ))}
        </section>
      )}
      {photos2.length > 0 && (
        <section className="wrap">
          <h2 className="text-lg font-semibold capitalize">
            How did climate change happen?
          </h2>
          {photos2.map((img, index) => (
            <div key={img.src} className="box">
              <Images
                onClick={() => setGallery2Index(index)}
                src={img.src}
                caption={img.caption}
                id={img.id}
                deleting={deleting}
                delete={() => deleteHandler(img.id, index)}
              />
            </div>
          ))}
        </section>
      )}

      {photos3.length > 0 && (
        <section className="wrap">
          <h2 className="text-lg font-semibold capitalize">
            How can we help using mothers mental health?
          </h2>
          {photos3.map((img, index) => (
            <div key={img.src} className="box">
              <Images
                onClick={() => setGallery3Index(index)}
                src={img.src}
                caption={img.caption}
                id={img.id}
                deleting={deleting}
                delete={() => deleteHandler(img.id, index)}
              />
            </div>
          ))}
        </section>
      )}
      <Lightbox
        open={gallery1Index >= 0}
        index={gallery1Index}
        close={() => setGallery1Index(-1)}
        slides={photos3}
      />
      <Lightbox
        open={gallery2Index >= 0}
        index={gallery2Index}
        close={() => setGallery2Index(-1)}
        slides={photos3}
      />
      <Lightbox
        open={gallery3Index >= 0}
        index={gallery3Index}
        close={() => setGallery3Index(-1)}
        slides={photos3}
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
