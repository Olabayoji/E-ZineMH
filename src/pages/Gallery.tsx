import { deleteObject, getDownloadURL, listAll, ref } from "@firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Images from "../components/Images";
import Modal from "../components/UI/Modal";
import Toast from "../components/UI/Toast";
import { storage } from "../utils/firbase";

type Props = {};

const Gallery = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [gallery1Index, setGallery1Index] = useState(-1);
  const [gallery2Index, setGallery2Index] = useState(-1);
  const [gallery3Index, setGallery3Index] = useState(-1);
  const [gallery4Index, setGallery4Index] = useState(-1);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<null | {
    id: string;
    index: number;
  }>(null);
  const [photos1, setPhotos1] = useState<
    { src: string; caption: string; id: string }[]
  >([]);
  const [photos2, setPhotos2] = useState<
    { src: string; caption: string; id: string }[]
  >([]);
  const [photos3, setPhoto3] = useState<
    { src: string; caption: string; id: string }[]
  >([]);
  const [photos4, setPhoto4] = useState<
    { src: string; caption: string; id: string }[]
  >([]);

  const effectRan = useRef(false);

  const gallery1Ref = ref(storage, "images/what-is-climate-change/");
  const gallery2Ref = ref(storage, "images/effects-of-climate-change/");
  const gallery3Ref = ref(
    storage,
    "images/how-can-we-help-young-mothers-(self)/"
  );
  const gallery4Ref = ref(
    storage,
    "images/how-can-we-help-young-mothers-(others)/"
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
          case "images/effects-of-climate-change/":
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
          case "images/how-can-we-help-young-mothers-(self)/":
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
          case "images/how-can-we-help-young-mothers-(others)/":
            images.items.forEach((image) => {
              getDownloadURL(image)
                .then((url) => {
                  setPhoto4((prev) => [
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
      getImages(gallery2Ref, "images/effects-of-climate-change/"); // get images in second section
      getImages(gallery3Ref, "images/how-can-we-help-young-mothers-(self)/"); //get images in third section
      getImages(gallery4Ref, "images/how-can-we-help-young-mothers-(others)/"); //get images in fourth section
    }

    return () => {
      effectRan.current = true;
    };
  }, [gallery1Ref, gallery2Ref, gallery3Ref, gallery4Ref]);

  const deleteHandler = (id: string, index: number) => {
    const imageRef = ref(storage, id);

    console.log(imageRef);
    console.log(id);
    console.log(photos1, photos2);

    // Send delete request
    setDeleting(true);
    deleteObject(imageRef)
      .then(() => {
        setSuccess("Image removed successfully");
        // Filter the deleted photo out
        setPhotos1(photos1.filter((photo) => photo.id !== id));
        setPhotos2(photos2.filter((photo) => photo.id !== id));
        setPhoto3(photos3.filter((photo) => photo.id !== id));
        setPhoto4(photos4.filter((photo) => photo.id !== id));
      })
      .catch((error) => {
        setError(error);
      });
    setDeleting(false);
    setShowModal(false);
  };

  return (
    <>
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
                  delete={() => {
                    setShowModal(true);
                    setSelected({ id: img.id, index: index });
                  }}
                />
              </div>
            ))}
          </section>
        )}
        {photos2.length > 0 && (
          <section className="wrap">
            <h2 className="text-lg font-semibold capitalize">
              Effects of climate change?
            </h2>
            {photos2.map((img, index) => (
              <div key={img.src} className="box">
                <Images
                  onClick={() => setGallery2Index(index)}
                  src={img.src}
                  caption={img.caption}
                  id={img.id}
                  deleting={deleting}
                  delete={() => {
                    setShowModal(true);
                    setSelected({ id: img.id, index: index });
                  }}
                />
              </div>
            ))}
          </section>
        )}

        {photos3.length > 0 && (
          <section className="wrap">
            <h2 className="text-lg font-semibold capitalize">
              How can we help young mothers (self)?
            </h2>
            {photos3.map((img, index) => (
              <div key={img.src} className="box">
                <Images
                  onClick={() => setGallery3Index(index)}
                  src={img.src}
                  caption={img.caption}
                  id={img.id}
                  deleting={deleting}
                  // delete={() => deleteHandler(img.id, index)}
                  delete={() => {
                    setShowModal(true);
                    setSelected({ id: img.id, index: index });
                  }}
                />
              </div>
            ))}
          </section>
        )}
        {photos4.length > 0 && (
          <section className="wrap">
            <h2 className="text-lg font-semibold capitalize">
              How can we help young mothers (others)?
            </h2>
            {photos4.map((img, index) => (
              <div key={img.src} className="box">
                <Images
                  onClick={() => setGallery4Index(index)}
                  src={img.src}
                  caption={img.caption}
                  id={img.id}
                  deleting={deleting}
                  // delete={() => deleteHandler(img.id, index)}
                  delete={() => {
                    setShowModal(true);
                    setSelected({ id: img.id, index: index });
                  }}
                />
              </div>
            ))}
          </section>
        )}
        <Lightbox
          open={gallery1Index >= 0}
          index={gallery1Index}
          close={() => setGallery1Index(-1)}
          slides={photos1}
        />
        <Lightbox
          open={gallery2Index >= 0}
          index={gallery2Index}
          close={() => setGallery2Index(-1)}
          slides={photos2}
        />
        <Lightbox
          open={gallery3Index >= 0}
          index={gallery3Index}
          close={() => setGallery3Index(-1)}
          slides={photos3}
        />
        <Lightbox
          open={gallery4Index >= 0}
          index={gallery4Index}
          close={() => setGallery4Index(-1)}
          slides={photos4}
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
      {/* Delete modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {showModal && (
          <div className="bg-white w-[90%] max-w-[20rem] rounded-xl z-[10] absolute p-4 mx-[50%] translate-x-[-50%] top-[50%]  ">
            <p>Are you sure you want to delete this image?</p>
            <div className="grid grid-cols-2 gap-x-3 mt-3">
              <button
                className="font-semibold"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white rounded-xl px-2 font-semibold"
                onClick={() => deleteHandler(selected!.id, selected!.index)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Gallery;
